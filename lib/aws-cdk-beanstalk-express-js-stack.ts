import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import * as elasticbeanstalk from 'aws-cdk-lib/aws-elasticbeanstalk'
import { CfnOutput } from 'aws-cdk-lib';

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

    const appName = 'cdk-beanstalk-express'

    const app = new elasticbeanstalk.CfnApplication(this, 'Application', {
      applicationName: appName
    })

    const environment = new elasticbeanstalk.CfnEnvironment(this, 'Environment', {
      environmentName: 'cdk-beanstalk-express-environment',
      applicationName: appName,
      solutionStackName: '64bit Amazon Linux 2 v5.5.6 running Node.js 16'
    })
    environment.addDependsOn(app)
  }
}
