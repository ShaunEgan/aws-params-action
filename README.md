# AWS Params Action

A GitHub action which retrieves parameters from AWS Systems Manager Parameter Store. Fetched parameters
are added as outputs of the action by their respective names

## Inputs

### `names`

**Required** The names of the parameters to fetch, comma separated

### `withDecryption`

**Required** Decrypt secure string values

## Example usage

```yaml
on: [push]

permissions:
  id-token: write
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Configure AWS credentials from Test account
        uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: arn:aws:iam::111111111111:role/my-github-actions-role-test
          aws-region: us-east-1

      - name: Fetch secrets from AWS SSM Parameter Store
        id: fetchSecrets
        uses: shaunegan/aws-params-action@main
        with:
          names: /Shared/SomeKey,Token
          withDecryption: true

      - name: Deploy
        run: |
          make deploy \
            --KEY=${{ steps.fetchSecrets.outputs['/Shared/SomeKey'] }} \
            --TOKEN=${{ steps.fetchSecrets.outputs.Token }}
```
