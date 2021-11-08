import { Component, OnInit } from '@angular/core';
import { Config, ConfigSerivce } from 'src/app/config/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styles: [
    'h3 { color: red; }'
  ]
})
export class ConfigComponent implements OnInit{

  config: Config | undefined;
  headers: string[] | [];
  error: any;

  constructor(private configService: ConfigSerivce){}

  ngOnInit() {}

  showConfig() {
    this.configService.getConfig().subscribe( (data) => {
      console.log('🦁 value >>: ', data);
      // this.config = {
      //   heroUrl: data.heroUrl,
      //   textFile: data.textFile,
      //   date: data.date
      // };
      console.log('🐳 data.body', data.body);
      // console.log('≥≥≥≥≥', data.body.date.toDateString());

      this.config = { ...data.body };
      console.log('👻 config : ', this.config);
    });
  }

  showConfigResponse() {
    this.configService.getConfig()
      .subscribe(resp => {
        const keys = resp.headers.keys();
        this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);
        this.config = {...resp.body};
      });
  }

  clear() {
    this.config = undefined;
    this.headers = [];
    this.error = undefined;
  }

  getType(val: any): string {
    return val instanceof Date ? 'date' : Array.isArray(val) ? 'array' : typeof val;
  }

  makeError() {
    console.log('🍌 make error');
  }

}
