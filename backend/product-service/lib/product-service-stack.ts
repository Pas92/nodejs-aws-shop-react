import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const productsList = new lambda.Function(this, 'Get-Products-List', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'get-products.handler',
    });

    const api = new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: productsList,
      proxy: false,
    });

    const products = api.root.addResource('products');
    products.addMethod('GET');

    const product = products.addResource('{product}');
    product.addMethod('GET');
  }
}
