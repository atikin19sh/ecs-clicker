import { TopBar } from "~/components/game/TopBar";
import { GameSystem } from "~/game/game.system";

export default function GameLayout(props: { children: React.ReactNode }) {
  return (
    <>
      {/* <GameSystem /> */}
      <div className="min-h-screen">
        <TopBar />
        {props.children}
      </div>
      ;
    </>
  );
}
