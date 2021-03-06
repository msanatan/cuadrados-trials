/**
 * @author       Marcus Sanatan <msanatan@gmail.com>
 * @copyright    2021 Marcus Sanatan
 * @description  Cuadrado's Trials
 */
import Phaser from 'phaser';
import {
  DOOR_KEY,
  PLAYER_KEY,
  TILES_KEY,
  getLevelKey,
  HORIZONTAL_PLATFORM_KEY,
  VERTICAL_PLATFORM_KEY,
  SPIKE_KEY,
  PARTICLE_KEY,
  COIN_KEY,
  COIN_ICON_KEY,
  CERTIFICATE_BACKGROUND_KEY,
  CUADRADO_BIG_KEY,
  TITLE_BACKGROUND_KEY,
  AUDIO_LEVEL_COMPLETE_KEY,
  AUDIO_MENU_SELECT_KEY,
  AUDIO_PLAYER_COLLECTS_COIN_KEY,
  AUDIO_PLAYER_DIES_KEY,
  AUDIO_PLAYER_JUMP_KEY,
  AUDIO_GAME_COMPLETE_KEY,
} from '../constants';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload(): void {
    // Add progress bars
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'LOADING',
      style: {
        font: '32px "Courier New"',
        color: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(String(value * 100)) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    this.load.spritesheet(PLAYER_KEY, 'assets/images/cuadrado.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image(TILES_KEY, 'assets/images/tiles.png');
    this.load.image(DOOR_KEY, 'assets/images/door.png');
    this.load.image(HORIZONTAL_PLATFORM_KEY, 'assets/images/horizontalPlatform.png');
    this.load.image(VERTICAL_PLATFORM_KEY, 'assets/images/verticalPlatform.png');
    this.load.image(SPIKE_KEY, 'assets/images/spike.png');
    this.load.image(PARTICLE_KEY, 'assets/images/particle.png');
    this.load.spritesheet(COIN_KEY, 'assets/images/coin.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image(COIN_ICON_KEY, 'assets/images/coin-icon.png');
    this.load.image(CERTIFICATE_BACKGROUND_KEY, 'assets/images/certificate-background.png');
    this.load.image(CUADRADO_BIG_KEY, 'assets/images/cuadrado-big.png');
    this.load.image(TITLE_BACKGROUND_KEY, 'assets/images/title-background.png');

    // Load audio for game
    this.load.audio(AUDIO_LEVEL_COMPLETE_KEY, 'assets/audio/sfx_sounds_fanfare3.wav');
    this.load.audio(AUDIO_MENU_SELECT_KEY, 'assets/audio/sfx_menu_select4.wav');
    this.load.audio(AUDIO_PLAYER_COLLECTS_COIN_KEY, 'assets/audio/sfx_coin_double7.wav');
    this.load.audio(AUDIO_PLAYER_DIES_KEY, 'assets/audio/sfx_deathscream_robot3.wav');
    this.load.audio(AUDIO_PLAYER_JUMP_KEY, 'assets/audio/sfx_movement_jump15.wav');
    this.load.audio(AUDIO_GAME_COMPLETE_KEY, 'assets/audio/game_complete.wav');

    // Load level (Tiled map files)
    for (let i = 1; i < 5; i++) {
      this.load.tilemapTiledJSON(getLevelKey(i), `assets/levels/level${i}.json`);
    }
  }

  async create() {
    try {
      await this.loadFonts('Pixel Inversions', 'assets/fonts/pixel-inversions.ttf');
      await this.loadFonts('VCR OSD Mono', 'assets/fonts/vcr-osd-mono.ttf');
      await this.loadFonts('Minecraft', 'assets/fonts/minecraft.ttf');
    } catch (error) {
      console.error('Could not load custom fonts');
    }

    this.scene.start('TitleScene');
  }

  async loadFonts(name: string, url: string) {
    const font = new FontFace(name, `url(${url})`);

    try {
      await font.load();
      document.fonts.add(font);
      document.body.classList.add('fonts-loaded');
    } catch (error) {
      console.error(`Could not load font ${name}: ${error.message}`);
    };
  }
}
