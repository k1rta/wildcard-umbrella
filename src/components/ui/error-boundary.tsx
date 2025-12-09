import React from 'react'
import { Title } from './title'
import { Text } from './text'

type ErrorBoundaryProps = {
  children: React.ReactNode
  onReset?: () => void
  resetKeys?: unknown[]
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && this.props.resetKeys !== prevProps.resetKeys) {
      this.setState({ hasError: false, error: null })
    }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.setState({ hasError: false, error: null })
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
          <Title>Something went wrong</Title>
          <Text className="!text-white/70 mt-4 text-center max-w-md">
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <button
            onClick={this.resetErrorBoundary}
            className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
