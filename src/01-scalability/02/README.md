# Escalabilidade Automática com Kubernetes através de trigger de cpu

### Step 1 - Copy/Paste [Exercício Anterior](../01/)

### Step 2 - Criando cluster kubernetes com kind
* Criando cluster (opcional)
```
kind create cluster --name pos-facef
```
* Validar funcionando do cluster
```
kubectl cluster-info --context kind-pos-facef
```
* Instalando o Metric Server
```
kubectl apply -f https://raw.githubusercontent.com/pedroarapua/performance-instrumentation-app-class/v2/src/01-scalability/02/kubernetes/cluster/components.yaml
```

### Step 3 - Criando Manifestos do Kubernetes
* Criando [manifesto de deploy](./kubernetes/app1/deployment.yaml)
* Criando [manifesto de service](./kubernetes/app1/service.yaml)
* Criando [manifesto de hpa](./kubernetes/app1/hpa.yaml)

### Step 4 - Subindo a Aplicação no Kubernetes
* Adicionando a imagem dentro do cluster (NÃO NECESSÁRIO DOCKER REGISTRY)
```
kind load docker-image pos-facef/app1:v1.0.0 --name pos-facef
```
* Aplicando os manifestos kubernetes
```
kubectl apply -f ./kubernetes/app1
```
* Obtendo o IP para o Cluster Kubernetes (field: INTERNAL-IP)
```
export HOST_IP=$(kubectl get nodes -o wide | awk 'NR>1{ print $6 }')
```

* Validar funcionando da api
```
curl http://${HOST_IP}:30000

```

### Step 5 - Analisando Comportamento de AutoScale do Kubernetes
* Visualizar o percentual de utilização (execute o comando em uma aba do terminal)
```
watch "kubectl get hpa"
```
* Visualizar os pods rodando (execute o comando em uma outra aba do terminal)
```
watch "kubectl get pods"
```
* Forçar uma carga na aplicação para subir o uso de CPU
```
k6 run ./k6/script.js
```

### Step 6 - Removendo Deploy da Aplicação
```
kubectl delete -f ./kubernetes/app1
```