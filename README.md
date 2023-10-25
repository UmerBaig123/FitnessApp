# FitnessApp

An app that counts calories and nutrients for you, tracks progress

## Installation

Install dependencies with npm

```bash
    npm install 
    npm i --force
```
Install dependencies with yard

```bash
    yarn install
    yarn
```

## API Reference

USDA food database API was used to get food data

#### Get item

```http
  GET https://api.nal.usda.gov/fdc/v1/foods/search?
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key`      | `string` | **Required** |
| `query`      | `string` | **Required** |
