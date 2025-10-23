# Uporabi uradni Nginx image
FROM nginx:alpine

# Odstrani default Nginx vsebine
RUN rm -rf /usr/share/nginx/html/*

# Kopiraj svoje HTML in CSS datoteke v mapo, ki jo Nginx streže
COPY . /usr/share/nginx/html

# Nginx bo samodejno poslušal na portu 80
EXPOSE 80

# Zagon Nginx v foregroundu
CMD ["nginx", "-g", "daemon off;"]
