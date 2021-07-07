.DEFAULT_GOAL := help

.PHONY: help
help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

sqs-ls:
	aws --region=us-east-1 --endpoint-url=http://localhost:4566 \
		sqs receive-message \
		--queue-url http://localhost:4566/000000000000/new-queue

sqs-purge:
	aws --region=us-east-1 --endpoint-url=http://localhost:4566 \
		sqs purge-queue \
		--queue-url http://localhost:4566/000000000000/new-queue

s3-upload:
	aws --region=us-east-1 --endpoint-url=http://localhost:4566 \
		s3 cp tmp/empty.json s3://new-bucket

sns-publish:
	aws --region=us-east-1 --endpoint-url=http://localhost:4566 \
		sns publish \
		--topic-arn arn:aws:sns:us-east-1:000000000000:new-topic \
		--message "{}"