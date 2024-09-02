FROM node:18.19

WORKDIR /app
COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENTRYPOINT ["sh", "./scripts/start.sh"]

# Start the application
CMD ["npm", "start"]
