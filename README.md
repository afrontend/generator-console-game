# generator-console-game [![NPM version][npm-image]][npm-url]
> make a console game with fp-panel

## Demo

![demo](https://github.com/afrontend/generator-console-game/releases/download/demo-assets/demo.gif)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-console-game using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-console-game
```

## Generating a New Project

Run the following command in the directory where you want to create your project:

```bash
yo console-game
```

You will be prompted for two inputs:

1. **Your project name** — the name of the game project (defaults to the current folder name)
2. **Your GitHub ID** — used to generate repository URLs in `package.json` and `README.md`

## Generated Project Structure

```
<project-name>/
├── lib/
│   └── index.js      # Game logic using fp-panel
├── src/
│   └── example.js    # CLI entry point
├── package.json
└── README.md
```

- **`lib/index.js`** — Core game logic built with [fp-panel](https://www.npmjs.com/package/fp-panel). Handles the shuttle, meteorites, missiles, collisions, and game state.
- **`src/example.js`** — Runs the game in the terminal, handles keyboard input and the game loop.

## Running the Generated Game

Navigate into the generated project directory and install dependencies:

```bash
cd <project-name>
npm install
```

Start the game:

```bash
npm start
```

To play in full terminal size:

```bash
npm start -- --full
```

## Game Controls

| Key | Action |
|-----|--------|
| `←` | Move shuttle left |
| `→` | Move shuttle right |
| `↑` | Fire missile |
| `Space` | Pause / Resume |
| `s` | Save current state |
| `l` | Load saved state |
| `q` / `Ctrl+C` | Quit |

## About fp-panel

The generated game is built on [fp-panel](https://github.com/afrontend/fp-panel) ([npm](https://www.npmjs.com/package/fp-panel)), a 2D grid panel manipulation library designed for building terminal-based games with a functional programming approach.

### What is fp-panel?

fp-panel represents the game screen as a 2D grid (panel) where each cell holds a color value. `'grey'` means empty, any other color means filled. All game objects — shuttle, missiles, meteorites — are individual panels that are composed together to produce the final display.

### Key API

| Function | Description |
|----------|-------------|
| `createPanel(rows, cols)` | Create a new empty panel |
| `paint(panel, positions, color)` | Fill specific positions with a color |
| `add(panels)` | Merge multiple panels into one |
| `sub(panelA, panelB)` | Subtract one panel from another (collision removal) |
| `up(panel)` / `down(panel)` | Move panel up or down by one row |
| `left(panel)` / `right(panel)` | Move panel left or right by one column |
| `adjustToCenter(panel)` | Align panel to horizontal center |
| `adjustToBottom(panel)` | Align panel to bottom |
| `adjustToRandomCenter(panel)` | Align panel to a random horizontal position |
| `isOnTheLeftEdge(panel)` | Check if panel has reached the left boundary |
| `isOnTheRightEdge(panel)` | Check if panel has reached the right boundary |
| `isOverlap(panelA, panelB)` | Check if two panels overlap |
| `isBlankPanel(panel)` | Check if a panel is entirely empty |
| `getZeroPoints(panel)` | Get positions marked as zero points |

### Benefits of using fp-panel

- **Immutability** — Every operation returns a new panel state rather than mutating the existing one, making game state predictable and easy to reason about.
- **Composability** — Simple functions like `up`, `left`, `paint` can be chained with `lodash.flow` to build complex behaviors in a readable pipeline.
- **Separation of concerns** — Game logic (movement, collision, rendering) is expressed as pure functions with no side effects, making each piece independently testable.
- **Declarative style** — Code describes *what* the game state should look like rather than *how* to imperatively draw it, reducing bugs and improving readability.

## Demo GIF 업데이트

터미널 동작 미리보기를 자동으로 재생성합니다.

```sh
# 의존 도구 설치 (최초 1회)
brew install asciinema
brew install agg
brew install gh && gh auth login

# 데모 생성 및 GitHub Releases 업로드
npm run release
```

`npm run release` 실행 순서:

1. `scripts/autoplay.js` — AI가 게임을 자동 플레이하고 자동 종료
2. `asciinema rec` — 터미널 출력을 `demo.cast`로 녹화
3. `agg` — `demo.cast` → `demo.gif` 변환
4. `gh release upload` — GitHub Releases `demo-assets` 태그에 업로드
5. `README.md` — GIF URL을 GitHub Releases 경로로 교체

master 브랜치에 푸시하면 `.github/workflows/demo.yml`이 위 과정을 자동으로 실행합니다.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Bob Hwang](https://afrontend.github.io)


[npm-image]: https://badge.fury.io/js/generator-console-game.svg
[npm-url]: https://npmjs.org/package/generator-console-game
