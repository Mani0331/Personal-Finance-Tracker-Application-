# Node.js ka official image use karein
FROM node:18  

# Kaam ki directory set karein
WORKDIR /app  

# package.json aur package-lock.json copy karein
COPY ../App/package.json ../App/package-lock.json ./

# Dependencies install karein
RUN npm install  

# Baaki sab files copy karein
COPY ../App .  

# Server start karne ke liye command
CMD ["npm", "start"]  

# App ka port expose karein
EXPOSE 3000