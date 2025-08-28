import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['workers/rawg_game_worker.ts'],
  outDir: 'dist/workers',
  format: ['cjs'],
  target: 'node21',
  sourcemap: true,
  clean: true,
  bundle: true, 
});
