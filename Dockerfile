FROM mcr.microsoft.com/playwright:v1.50.1-jammy

RUN mkdir /qaauto_playwright
WORKDIR /qaauto_playwright

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]