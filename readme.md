# Pact Test Example

This project demonstrates how to use Pact for contract testing between a consumer and a provider.

## Project Structure

## Prerequisites

- Node.js (for the consumer)
- Go (for the provider)
- Ruby 3.3.0 (for Pact)

## Installation

### Consumer

1. Navigate to the consumer directory:
   ```
   cd pact-test/consumer
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Provider for js

1. Navigate to the consumer directory:
   ```
   cd pact-test/provider
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Provider for go

1. Navigate to the consumer directory:
   ```
   cd pact-test/provider_go
   ```

2. Install dependencies:
   ```
   go mod
   go install github.com/pact-foundation/pact-go/v2@latest
   gem install pact-mock_service
   ```
## Usage

### Consumer

1. Write your consumer tests using Jest and Pact.
2. Run the consumer tests:
   ```
   npm test
   #generate pact file
   ```
### Provider for js

1. Run the provider tests in the provider directory:
   ```
   npm test
   ```

### Provider for go

1. Run the provider tests in the provider_go directory:
   ```
   go test -v
   ```