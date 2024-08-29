package main

import (
	"encoding/json"
	"net/http"
	"os"
	"testing"

	"github.com/pact-foundation/pact-go/dsl"
	"github.com/pact-foundation/pact-go/types"
)

func TestPactProvider(t *testing.T) {
	pact := &dsl.Pact{
		Provider: "UserProvider",
	}

	// 启动您的API服务器
	go startServer()

	// 验证期望
	_, err := pact.VerifyProvider(t, types.VerifyRequest{
		ProviderBaseURL:            "http://localhost:9999",
		PactURLs:                   []string{"../consumer/pacts/userconsumer-userprovider.json"},
		PublishVerificationResults: true,
		ProviderVersion:            "1.0.0",
		BrokerURL:                  os.Getenv("PACT_BROKER_URL"),
	})

	if err != nil {
		t.Fatalf("Error on Verify: %v", err)
	}
}

func startServer() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"id":    1,
			"name":  "Lisa",
			"email": "lisa@example.com",
			"age":   31,
		})
	})
	http.ListenAndServe(":9999", nil)
}
