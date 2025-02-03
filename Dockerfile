# Usa a imagem do Node.js (adicione a versão correta que está usando)
FROM node:23-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos para dentro do container
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3333

# Define o comando para rodar a aplicação
CMD ["node", "ace", "serve", "--watch"]
