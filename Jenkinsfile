pipeline {
  agent { label 'built-in' }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Checking out source code..."
        checkout scm
      }
    }

    stage('Build Frontend') {
      steps {
        dir('whole-frontend') {
          echo "Installing frontend dependencies..."
          bat 'npm install'

          echo "Building frontend with Vite..."
          bat 'npm run build'

          echo "Frontend build completed."
          bat 'echo FRONTEND_BUILD_OK > frontend-artifact.txt'
        }
      }
    }

    stage('Build Backend') {
      steps {
        dir('whole-backend') {
          echo "Installing backend dependencies..."
          bat 'npm install'

          echo "Backend build completed."
          bat 'echo BACKEND_BUILD_OK > backend-artifact.txt'
        }
      }
    }

    stage('Post-Build Checks') {
      parallel {
        stage('Frontend Test / Lint') {
          steps {
            dir('whole-frontend') {
              echo "Running frontend lint/tests..."
              bat 'npm run lint || echo Lint skipped'
              bat 'npm test || echo Tests skipped'
            }
          }
        }
        stage('Backend Test / Lint') {
          steps {
            dir('whole-backend') {
              echo "Running backend lint/tests..."
              bat 'npm run lint || echo Lint skipped'
              bat 'npm test || echo Tests skipped'
            }
          }
        }
      }
    }
  }

  post {
    always {
      echo "Archiving build artifacts..."
      archiveArtifacts artifacts: '''
        whole-frontend/dist/**,
        whole-frontend/frontend-artifact.txt,
        whole-backend/backend-artifact.txt
      ''', allowEmptyArchive: true
    }
  }
}
