#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkBeanstalkExpressJsStack } from '../lib/aws-cdk-beanstalk-express-js-stack';

const app = new cdk.App();
new AwsCdkBeanstalkExpressJsStack(app, 'AwsCdkBeanstalkExpressJsStack', {});

