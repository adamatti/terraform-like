LAWS=aws --region=us-east-1 --endpoint-url=http://localhost:4566
QUEUE_URL=http://localhost:4566/000000000000/new-queue
.DEFAULT_GOAL := help

.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

clean:
	@rm -rf node_modules
	@rm -f package-lock.json

install:
	@yarn

run:
	yarn start

lint:
	yarn lint --fix

sqs-ls:
	$(LAWS) sqs receive-message --queue-url $(QUEUE_URL)

sqs-purge:
	$(LAWS) sqs purge-queue --queue-url $(QUEUE_URL)

s3-upload:
	$(LAWS) s3 cp tmp/empty.json s3://new-bucket

sns-publish:
	$(LAWS) sns publish \
		--topic-arn arn:aws:sns:us-east-1:000000000000:new-topic \
		--message "{}"