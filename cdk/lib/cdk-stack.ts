import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {BlockPublicAccess, Bucket} from "aws-cdk-lib/aws-s3";
import { RemovalPolicy } from 'aws-cdk-lib';
import {S3Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import {Distribution, ViewerProtocolPolicy} from "aws-cdk-lib/aws-cloudfront";
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostingBucket = new Bucket(this, 'FrontendBucket', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: 'eten-benkhard-nl-react-bucket'
    });

    const distribution = new Distribution(this, 'CloudfrontDistribution', {
      defaultBehavior: {
        origin: new S3Origin(hostingBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
    });

    new BucketDeployment(this, 'BucketDeployment', {
      sources: [Source.asset("../build")],
      destinationBucket: hostingBucket,
      distribution,
      distributionPaths: ['/*'],
    });

  }
}
