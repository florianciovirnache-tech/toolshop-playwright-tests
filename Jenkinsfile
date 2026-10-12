pipeline {
    agent any

    // NEW: verifică GitHub la fiecare 5 minute; dacă e cod nou, rulează testele
    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Check Toolshop is running') {
            steps {
                powershell '''
                    Invoke-WebRequest -Uri http://localhost:8091/brands -UseBasicParsing | Out-Null
                    Invoke-WebRequest -Uri http://localhost:4200 -UseBasicParsing | Out-Null
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }

        stage('Run tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}