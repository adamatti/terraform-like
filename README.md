Pet project to create AWS artifacts (e.g. s3, sqs, dynamo) on [localstack](https://github.com/localstack/localstack).

# But why not [Terraform](https://www.terraform.io/) / [Pulumi](https://www.pulumi.com/) / etc

Because they are slow for local development (IMHO) and I don't care about state (it is ok to destroy / recreate).

# Next steps

- improve logs
- lint?
- destroy? (do I need it?)