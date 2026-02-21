@Library("Shared") _
pipeline {
    agent {label "agent-1"}
    
    stages{
        stage('code-clonning'){
            steps{
                script{
                    clone("https://github.com/Poorviraj/Weather.git","main")
                }
            }
        }
        stage('code-building'){
            steps{
                echo "this is a code-building stage"
                sh "docker build -t weather ."
            }   
        }
        stage('image pushing'){
            steps{
                echo "this is a stage for pushing image to dockerhub"
                withCredentials([usernamePassword(credentialsId:"dockerHubCred",passwordVariable:"dockerhubpass",usernameVariable:"dockerhubuser")]){
                    sh "docker login -u ${dockerhubuser} -p ${dockerhubpass}"
                    sh "docker image tag weather:latest poorviraj/weather:latest"
                    sh "docker push poorviraj/weather:latest"
                }
            }
        }
        stage('start container'){
            steps{
                echo "this is a stage for starting container"
                sh "docker compose down && docker compose up -d"
            }
        }
    }
    
}
