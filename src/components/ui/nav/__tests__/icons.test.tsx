import * as Icons from '../icons'

describe('Icons', () => {
  it('should export icon components', () => {
    // icons.tsx is a re-export file, verify exports exist
    expect(Icons).toBeDefined()
  })

  it('should have FileText icon', () => {
    expect(Icons.FileText).toBeDefined()
  })

  it('should have Presentation icon', () => {
    expect(Icons.Presentation).toBeDefined()
  })

  it('should have BarChartBig icon', () => {
    expect(Icons.BarChartBig).toBeDefined()
  })

  it('should have Activity icon', () => {
    expect(Icons.Activity).toBeDefined()
  })

  it('should have Linkedin icon', () => {
    expect(Icons.Linkedin).toBeDefined()
  })

  it('should have Building2 icon', () => {
    expect(Icons.Building2).toBeDefined()
  })
})
