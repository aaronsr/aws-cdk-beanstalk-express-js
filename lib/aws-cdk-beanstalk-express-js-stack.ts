import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkBeanstalkExpressJsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new CodePipeline(this, 'cdk-beanstalk-express', {
      pipelineName: 'cdk-beanstalk-express',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('aaronsr/aws-cdk-beanstalk-express-js', 'main'),
        commands: ['npm ci',
                   'npm run build',
                   'npx cdk synth']
      })
    })
  }
}
