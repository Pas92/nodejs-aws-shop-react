import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_s3_deployment as s3deploy } from 'aws-cdk-lib';
import { aws_iam as iam } from 'aws-cdk-lib';

import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const shopBucket = new s3.Bucket(this, 'RssShopBucket', {
      bucketName: 'shop-bucket',
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      accessControl: s3.BucketAccessControl.PUBLIC_READ_WRITE,
      // objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
    });

    shopBucket.grantRead(new iam.AccountRootPrincipal());

    //TODO: Add cloudfront distribution
    // new s3deploy.BucketDeployment(this, 'DeployWebsite', {
    //   sources: [
    //     s3deploy.Source.asset(path.resolve(__dirname, '../../dist'), {}),
    //   ],
    //   destinationBucket: shopBucket,
    // });

    new cdk.CfnOutput(this, 'BucketDomain', {
      value: shopBucket.bucketWebsiteUrl,
      exportName: 'DeploymentBucket',
    });
  }
}
