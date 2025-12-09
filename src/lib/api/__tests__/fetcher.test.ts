import { fetcher } from '../fetcher'

type MockResponseInit = {
  ok: boolean
  status: number
  json: jest.Mock
  headers?: Headers
  statusText?: string
  redirected?: boolean
  type?: ResponseType
  url?: string
}

const createMockResponse = (init: MockResponseInit): Response => ({
  bytes: () => Promise.resolve(new Uint8Array()),
  ok: init.ok,
  status: init.status,
  json: init.json,
  headers: init.headers || new Headers(),
  statusText: init.statusText || '',
  redirected: init.redirected || false,
  type: init.type || 'basic',
  url: init.url || '',
  body: null,
  bodyUsed: false,
  arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  blob: () => Promise.resolve(new Blob()),
  formData: () => Promise.resolve(new FormData()),
  text: () => Promise.resolve(''),
  clone: function () {
    return this
  },
})

describe('fetcher', () => {
  const mockUrl = 'https://api.example.com/data'
  const mockData = { id: 1, name: 'Test' }

  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Successful requests', () => {
    it('should fetch and parse JSON data', async () => {
      const mockJson = jest.fn().mockResolvedValue(mockData)
      const mockResponse = createMockResponse({
        ok: true,
        status: 200,
        json: mockJson,
      })

      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)

      const result = await fetcher(mockUrl)

      expect(result).toEqual(mockData)
      expect(global.fetch).toHaveBeenCalledWith(mockUrl)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(mockJson).toHaveBeenCalledTimes(1)
    })

    it('should handle empty response body', async () => {
      const mockJson = jest.fn().mockResolvedValue(null)
      const mockResponse = createMockResponse({
        ok: true,
        status: 204,
        json: mockJson,
      })

      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)

      const result = await fetcher(mockUrl)
      expect(result).toBeNull()
      expect(mockJson).toHaveBeenCalledTimes(1)
    })
  })

  describe('Error handling', () => {
    it('should throw error with status for non-200 response', async () => {
      const mockErrorData = { message: 'Not found' }
      const mockJson = jest.fn().mockResolvedValue(mockErrorData)
      const mockResponse = createMockResponse({
        ok: false,
        status: 404,
        json: mockJson,
        statusText: 'Not Found',
      })

      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)

      await expect(fetcher(mockUrl)).rejects.toMatchObject({
        message: 'An error occurred while fetching the data.',
        status: 404,
        info: mockErrorData,
      })
      expect(mockJson).toHaveBeenCalledTimes(1)
    })

    it('should handle non-JSON error responses', async () => {
      const mockJson = jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      const mockResponse = createMockResponse({
        ok: false,
        status: 500,
        json: mockJson,
        statusText: 'Internal Server Error',
      })

      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)

      await expect(fetcher(mockUrl)).rejects.toMatchObject({
        message: 'An error occurred while fetching the data.',
        status: 500,
        info: {},
      })
      expect(mockJson).toHaveBeenCalledTimes(1)
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network error')
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(networkError)

      await expect(fetcher(mockUrl)).rejects.toThrow('Network error')
    })

    it('should match error structure snapshot', async () => {
      const mockJson = jest.fn().mockResolvedValue({ message: 'Not found' })
      const mockResponse = createMockResponse({
        ok: false,
        status: 404,
        json: mockJson,
        statusText: 'Not Found',
      })

      ;(global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse)

      await expect(fetcher(mockUrl)).rejects.toMatchSnapshot()
      expect(mockJson).toHaveBeenCalledTimes(1)
    })
  })

  describe('Type safety', () => {
    interface TestType {
      id: number
      name: string
    }

    it('should handle typed responses', async () => {
      const mockTypedData: TestType = { id: 1, name: 'Test' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockTypedData),
      } as Response)

      const result = await fetcher<TestType>(mockUrl)
      expect(result).toEqual(mockTypedData)
      expect(result.id).toBe(1)
      expect(result.name).toBe('Test')
    })
  })
})
