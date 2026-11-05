import { readFile } from 'node:fs/promises';
import { load } from 'js-yaml';

const config = load(await readFile('public/admin/config.yml', 'utf8'));

const fileFields = new Map();
for (const collection of config.collections) {
  for (const file of collection.files || []) {
    fileFields.set(file.file.replaceAll('\\', '/'), file.fields);
  }
}

function missingKeys(value, fields, path, problems) {
  if (Array.isArray(value)) {
    const field = fields.find((f) => f.widget === 'list');
    if (!field) {
      problems.push(`${path}: no list field`);
      return;
    }
    value.forEach((item, index) => {
      if (item && typeof item === 'object') {
        missingKeys(item, field.fields || [], `${path}[${index}]`, problems);
      } else if (!field.field) {
        problems.push(`${path}[${index}]: primitive list has no field`);
      }
    });
    return;
  }

  if (value && typeof value === 'object') {
    const names = new Set(fields.map((f) => f.name));
    for (const [key, child] of Object.entries(value)) {
      const field = fields.find((f) => f.name === key);
      if (!field) {
        problems.push(`${path}.${key}: missing field definition`);
        continue;
      }
      if (field.widget === 'object') {
        missingKeys(child, field.fields || [], `${path}.${key}`, problems);
      } else if (field.widget === 'list') {
        missingKeys(child, [field], `${path}.${key}`, problems);
      }
    }
  }
}

const problems = [];
for (const [file, fields] of fileFields) {
  const json = JSON.parse(await readFile(file, 'utf8'));
  missingKeys(json, fields, file, problems);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Schema covers every key in ${fileFields.size} content files.`);
}
