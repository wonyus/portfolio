import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel({
    serviceName: 'portfolio',
    instrumentations: [
      {
        name: 'ai-instrumentation',
        include: [/^\/api\/ai/]
      }
    ]
  })
}