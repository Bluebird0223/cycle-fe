pipeline {
    agent any

    environment {
        EMAIL_RECIPIENTS = 'aiits.aws@gmail.com,rahila.shaheen@gmail.com'
        CI = 'false' // Disabling CI mode for the build
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Start Build Notification') {
            steps {
                script {
                    emailext(
                        subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - Start Building",
                        body: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} is starting. Check console output at ${env.BUILD_URL} to view the results.",
                        to: "${EMAIL_RECIPIENTS}",
                        from: 'aiits.aws@gmail.com',
                        replyTo: 'aiits.aws@gmail.com'
                    )
                }
            }
        }

        stage('Checkout') {
            steps {
                git credentialsId: 'git', url: 'https://github.com/AIITS/kanchandeep-forntend.git', branch: 'uat'
            }
        }

        stage('Install Node.js and npm') {
            steps {
                sh '''
                curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                sudo apt-get install -y nodejs
                '''
            }
        }

        stage('Build') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kanchandeep-fe', variable: 'ENV_FILE')]) {
                        sh '''
                        export CI=false
                        cp ${ENV_FILE} .env
                        npm install --force
                        npm run build
                        '''
                    }
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    sh '''

                    echo "Cleaning /var/www/kanchandeep directory"
                    sudo rm -rf /var/www/kanchandeep/*

                    echo "Copying built files to /var/www/kanchandeep"
                    sudo cp -r build/* /var/www/kanchandeep/

                    echo "Restarting Nginx"
                    sudo systemctl restart nginx
                    '''
                }
            }
        }

        stage('Build Check') {
            steps {
                script {
                    def deploymentSuccess = true
                    if (!deploymentSuccess) {
                        error "Build Failed"
                    }
                }
            }
        }
    }

    post {
        success {
            emailext(
                subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - Build and Deployment Successful",
                body: "The Build of ${env.JOB_NAME} - Build #${env.BUILD_NUMBER} was successful and deployed to the server.",
                to: "${EMAIL_RECIPIENTS}",
                from: 'aiits.aws@gmail.com',
                replyTo: 'aiits.aws@gmail.com'
            )
        }

        failure {
            emailext(
                subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - Build or Deployment Failed",
                body: "The Build of ${env.JOB_NAME} - Build #${env.BUILD_NUMBER} has failed. Please check the console output at ${env.BUILD_URL} for more details.",
                to: "${EMAIL_RECIPIENTS}",
                from: 'aiits.aws@gmail.com'
            )
        }
    }
}
