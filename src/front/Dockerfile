# ==================================
# STAGE 1: BUILD (Compilação)
# Usa a versão LTS 20 do Node.js, recomendada para Angular 18+
# ==================================
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do container
# O /app será o diretório raiz do Angular
WORKDIR /app

# 1. Copia apenas os arquivos de dependência do CONTEXTO (./src/front)
# O ponto (.) refere-se à raiz do contexto, que é o ./src/front
COPY package*.json ./

# 2. Instala as dependências (Camada para cache)
RUN npm install --silent

# 3. Copia o restante dos arquivos do projeto (código-fonte)
COPY . .

# 4. Executa o build
# Argumento para definir o ambiente de build (padrão é dev)
RUN npm run build

# ==================================
# STAGE 2: SERVE (NGINX)
# ==================================
FROM nginx:stable-alpine

# O diretório de build no Stage 1 é /app/dist/
# Assumimos que o caminho de saída do Angular é dist/front/browser
COPY --from=build /app/dist/tio-app/browser /usr/share/nginx/html

# Expõe a porta padrão do NGINX
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
