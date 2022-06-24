import { Controller, Get, Param, Res } from '@nestjs/common';
let credentials = {};
// import fs from 'fs'
// import contentful from 'contentful';
import { ContentfulClientApi, createClient } from 'contentful';
// if (fs.existsSync('./credentials.json')) {
//   credentials = import('./credentials.json');
// }

const client = createClient({
  space: 'tdvnjjwn64li',
  accessToken: 'ijIjeJKS46vkmropMcvMbkJWK5eYEHu6gOuqYRfwPA0',
});

async function getCustomEntries(entry: string): Promise<any[]> {
  const entries = await client.getEntries({ content_type: entry });
  return entries.items;
}

@Controller('cats')
export class CatsController {
  @Get()
  findAll() {

    let html: string = '<h1>Cadbury</h1>';

    return new Promise((resolve, reject) => {
      
      getCustomEntries('cadbury')
        .then((res) => {
          let data = res[0].fields.images;

          data.forEach((img: any) => {
            html += `
            <a href="/cats/${img.sys.id}">
              <img src="${img.fields.file.url}" alt="${img.fields.title}">
            </a>`;
          });
          
          resolve(html);
        })
        .catch((err) => console.log(err));

    });
  }

  @Get('some')
  findSome() {
    // fetch('')
    return 'This action returns some cats';
  }

  @Get(':id')
  findOne(@Param() params): any {
    console.log(params.id);
    
    let html: string = '<h1>Cadbury</h1>';

    return new Promise((resolve, reject) => {
      
      getCustomEntries('cadbury')
        .then((res) => {
          let data = res[0].fields.images;

          data.forEach((img: any) => {
            if (params.id == img.sys.id){
              html += `
              <img src="${img.fields.file.url}" alt="${img.fields.title}">
              <a href="/cats/">Back</a>`;
            }
          });
          
          resolve(html);
        })
        .catch((err) => console.log(err));

    });
  }
}