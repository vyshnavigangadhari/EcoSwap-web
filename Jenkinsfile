pipeline {
  agent none
  triggers {
    githubPush()
  }
  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    stage('Where am I (Controller)') {
      agent { label 'built-in' }
      steps {
        echo "NODE = ${env.NODE_NAME}"
        echo "WORKSPACE = ${env.WORKSPACE}"
      }
    }

    stage('Build Frontend') {
      agent { label 'linux' }  // change to your frontend-capable agent
      steps {
        dir('whole-frontend') {
          echo "Installing frontend dependencies..."
          sh 'npm install'

          echo "Building frontend with Vite..."
          sh 'npm run build'

          echo "Frontend build OK"
          sh 'echo FRONTEND_BUILD_OK > frontend-artifact.txt'
        }
      }
    }

    stage('Build Backend') {
      agent { label 'linux' }  // or 'node', whatever your backend agent
      steps {
        dir('whole-backend') {
          echo "Installing backend dependencies..."
          sh 'npm install'

          echo "Running backend build (if any)..."
          // If there's build step, e.g. tsc compile, or something
          // For example: sh 'npm run build-backend'

          echo "Backend build OK"
          sh 'echo BACKEND_BUILD_OK > backend-artifact.txt'
        }
      }
    }

    stage('Parallel: Post-Build Checks') {
      parallel {
        stage('Frontend Test / Lint') {
          agent { label 'linux' }
          steps {
            dir('whole-frontend') {
              echo "Running frontend lint/tests"
              // example:
              sh 'npm run lint'      // if you have lint
              sh 'npm test'          // if you have tests
            }
          }
        }
        stage('Backend Test / Lint') {
          agent { label 'linux' }
          steps {
            dir('whole-backend') {
              echo "Running backend lint/tests"
              // example:
              sh 'npm run lint'      // adjust if you have tests
              sh 'npm test'
            }
          }
        }
      }
    }
  }

  post {
    always {
      // choose a node/agent that has the artifacts
      node('linux') {   // or appropriate label
        archiveArtifacts artifacts: '''
          whole-frontend/dist/,
          whole-frontend//frontend-artifact.txt,
          whole-backend//backend-artifact.txt
        ''', allowEmptyArchive: false
      }
    }
  }
}
