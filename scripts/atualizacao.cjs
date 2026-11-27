// monta atualizacao.json com o histórico de novidades (para mostrar "o que mudou" mesmo pulando versões)
const fs=require('fs');const e=process.env;
let ant={};try{ant=JSON.parse(fs.readFileSync('anterior.json','utf8'));}catch(x){}
const msg=(e.MSG||'').trim();const generica=/^(add files via upload|update |create |teste|merge )/i.test(msg)||!msg;
const hist=(ant.historico||[]).filter(h=>h&&h.versao!==e.VERSAO);
if(!generica)hist.unshift({versao:e.VERSAO,nota:msg});
const R=`https://github.com/${e.GITHUB_REPOSITORY}/releases`;
const out={versao:e.VERSAO,nativo:Number(e.NATIVO),zip:`${R}/download/v${e.VERSAO}/bundle.zip`,sha256:e.SHA,apk:`${R}/latest/download/HarvestInvest.apk`,historico:hist.slice(0,40)};
fs.writeFileSync('atualizacao.json',JSON.stringify(out));console.log(JSON.stringify(out,null,1).slice(0,800));
