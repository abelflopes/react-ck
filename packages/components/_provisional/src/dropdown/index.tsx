import React, { useRef, useState } from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";

export interface DropdownProps {
  position?: PositionEngineProps["position"];
}

export const Dropdown = ({
  position = "bottom-center",
}: Readonly<DropdownProps>): React.ReactElement => {
  const [sizeToggle, setSizeToggle] = useState(true);
  const rootRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        onClick={() => {
          setSizeToggle((v) => !v);
        }}>
        Toggle Size
      </button>
      <PositionEngine
        position={position}
        anchorRef={rootRef}
        render={({ style }) => (
          <Layer elevation="popup">
            <p
              style={{
                ...style,
                color: "blue",
                margin: 0,
                background: "#ccc",
                padding: 10,
                boxSizing: "border-box",
                overflow: "auto",
              }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nostrum tenetur
              possimus fugiat in, iusto tempora accusantium eum quas enim beatae nihil qui quod
              atque, hic facilis. Architecto illum hic repellendus eligendi, dolor sit nobis
              reiciendis illo sapiente similique perspiciatis aut voluptate, ducimus officia
              voluptatum rem incidunt! Quia, odit, soluta atque quisquam mollitia voluptate possimus
              molestiae laudantium nihil nam minima et? Cum sapiente, corrupti, eligendi odio
              maiores laudantium porro non quaerat dolorem excepturi praesentium earum in
              laboriosam! Maxime, repellat! Officia quas nulla quam maxime, inventore ea nihil,
              perspiciatis officiis tempora doloribus tempore a dolores numquam repellendus maiores
              iusto ipsam amet.
            </p>
          </Layer>
        )}
      />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, quas. Sint, illum dolore
      error culpa deleniti sequi rem ratione aliquam modi eum, praesentium alias corporis numquam
      delectus optio minima cupiditate voluptates id? Voluptatum ea itaque officiis, commodi,
      explicabo quam ex quis culpa voluptatibus pariatur ipsum repellat illo temporibus, harum
      facilis odio eligendi recusandae placeat ad autem? Nisi ea excepturi saepe, deleniti, unde
      reiciendis id magnam vero natus pariatur quae sunt, doloremque ipsa voluptas itaque. Quos sit,
      amet corrupti ratione rerum tempore quo debitis odio ad voluptas recusandae nam maxime optio
      sed laboriosam vero eos quibusdam saepe hic? Molestiae, assumenda fuga?
      <button ref={rootRef} style={sizeToggle ? { width: 300, height: 200 } : {}}>
        Dropdown
        <br />
        eee
      </button>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente iusto placeat quos libero,
      porro ab quidem cum, officiis ut facilis minima. Mollitia debitis, enim excepturi explicabo
      labore, inventore dignissimos eligendi laboriosam molestiae quos reiciendis repellendus.
      Beatae aliquid dolorem odit, laborum rem cupiditate culpa! Nesciunt saepe aliquam
      necessitatibus officiis dignissimos! Libero, illo dolorum ipsa recusandae facere quas quo
      temporibus natus, unde id at. Quo molestias quisquam qui, magnam eligendi in quis nesciunt,
      earum tenetur hic voluptatem iusto. Quae nemo minima pariatur tenetur natus laudantium
      perspiciatis! Rem recusandae dolorem quasi expedita dicta, maiores facilis vitae, officia
      ipsam a suscipit. Esse, repudiandae iste?
    </>
  );
};
