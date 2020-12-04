const assert = require('assert');

function loadYamlFile(filename) {
    const fs = require('fs');
    const yaml = require('js-yaml');
    const yamlText = fs.readFileSync(filename, 'utf8')
    return yaml.safeLoad(yamlText);
}
function paramsCheck(datas){
    Object.values(datas).forEach((data) => {
        assert.ok(typeof data.cardTitle !== 'undefined',"no cardTtile card detected:"+JSON.stringify(data));
        assert.ok(typeof data.cardText !== 'undefined',"card:"+data.cardTitle+"does not have cardText");
    });
}
try {
    const data = loadYamlFile('cardData.yml');
    paramsCheck(data);
} catch (err) {
    console.error(err.message);
}