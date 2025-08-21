#!/usr/bin/env node

/**
 * バージョン更新スクリプト
 * packages/core/package.json と ルートのpackage.json のバージョンを同期更新する
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VERSION_TYPES = ['patch', 'minor', 'major'];

function showUsage() {
  console.log('Usage: node scripts/bump-version.js <version_type> [--dry-run]');
  console.log('');
  console.log('Version types:');
  console.log('  patch  - 0.1.4 → 0.1.5 (バグフィックス)');
  console.log('  minor  - 0.1.4 → 0.2.0 (新機能)');
  console.log('  major  - 0.1.4 → 1.0.0 (破壊的変更)');
  console.log('');
  console.log('Options:');
  console.log('  --dry-run  - 実際の更新は行わず、どう変更されるかを表示');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/bump-version.js patch');
  console.log('  node scripts/bump-version.js minor --dry-run');
}

function getCurrentVersion() {
  const corePackagePath = path.join(__dirname, '../packages/core/package.json');
  const corePackage = JSON.parse(fs.readFileSync(corePackagePath, 'utf8'));
  return corePackage.version;
}

function bumpVersion(versionType, dryRun = false) {
  const currentVersion = getCurrentVersion();
  
  console.log(`📦 現在のバージョン: ${currentVersion}`);
  console.log(`🔄 バージョンタイプ: ${versionType}`);
  
  if (dryRun) {
    console.log('🔍 ドライランモード - 実際の変更は行いません');
  }
  
  // packages/core のバージョンを更新
  const corePackagePath = path.join(__dirname, '../packages/core');
  let newVersion;
  
  try {
    if (dryRun) {
      // ドライランの場合、一時的にバージョンを変更して確認
      const output = execSync(`cd ${corePackagePath} && npm version ${versionType} --no-git-tag-version`, { encoding: 'utf8' });
      newVersion = output.trim();
      
      // 元に戻す
      execSync(`cd ${corePackagePath} && git checkout -- package.json`, { encoding: 'utf8' });
    } else {
      const output = execSync(`cd ${corePackagePath} && npm version ${versionType} --no-git-tag-version`, { encoding: 'utf8' });
      newVersion = output.trim();
    }
    
    console.log(`✅ 新しいバージョン: ${newVersion}`);
    
    if (!dryRun) {
      // ルートのpackage.jsonも更新
      const rootPackagePath = path.join(__dirname, '../package.json');
      const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
      rootPackage.version = newVersion.replace('v', ''); // 'v' プレフィックスを削除
      fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2) + '\n');
      
      console.log('✅ ルートのpackage.jsonも更新されました');
      console.log('');
      console.log('次のステップ:');
      console.log('1. git add packages/core/package.json package.json');
      console.log(`2. git commit -m "chore: bump version to ${newVersion}"`);
      console.log(`3. git tag -a "${newVersion}" -m "Release ${newVersion}"`);
      console.log('4. git push origin HEAD --tags');
    } else {
      console.log('');
      console.log('ドライランが完了しました。実際に更新するには --dry-run を外して再実行してください。');
    }
    
  } catch (error) {
    console.error('❌ バージョン更新中にエラーが発生しました:', error.message);
    process.exit(1);
  }
}

// メイン処理
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showUsage();
  process.exit(0);
}

const versionType = args[0];
const dryRun = args.includes('--dry-run');

if (!VERSION_TYPES.includes(versionType)) {
  console.error(`❌ 無効なバージョンタイプ: ${versionType}`);
  console.error(`有効なタイプ: ${VERSION_TYPES.join(', ')}`);
  process.exit(1);
}

bumpVersion(versionType, dryRun);
