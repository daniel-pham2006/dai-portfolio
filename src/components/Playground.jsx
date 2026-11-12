import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Playground() {
  const [gradient, setGradient] = useState({ x: 50, y: 50 });
  const [drag, setDrag] = useState({ x: 50, y: 50 });
  const [type, setType] = useState(0);
  const dragRef = useRef(null);
  const reduce = useReducedMotion();
  const position = (event, element) => {
    const r = element.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((event.clientX - r.left) / r.width) * 100)),
      y: Math.max(0, Math.min(100, ((event.clientY - r.top) / r.height) * 100)),
    };
  };
  const moveDrag = (e) => {
    if (e.buttons || e.pointerType === "touch")
      setDrag(position(e, dragRef.current));
  };
  return (
    <section id="playground" className="section playground-section">
      <div className="section-top">
        <span className="eyebrow">04 / INTERACTION NOTES</span>
        <span className="section-rule" />
      </div>
      <div className="playground-heading">
        <motion.h2
          className="display-heading"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          A little room
          <br />
          <em>to play.</em>
        </motion.h2>
        <p>
          Small experiments in light, movement and type. Move your pointer or
          touch the panels.
        </p>
      </div>
      <div className="experiments">
        <div
          className="experiment gradient-experiment"
          onPointerMove={(e) => setGradient(position(e, e.currentTarget))}
          style={{ "--gx": `${gradient.x}%`, "--gy": `${gradient.y}%` }}
        >
          <div className="experiment-info">
            <span>01 / LIGHT FIELD</span>
            <p>Move your pointer to direct the light.</p>
          </div>
          <div className="gradient-core" />
          <span className="experiment-coordinate">
            X {Math.round(gradient.x)} / Y {Math.round(gradient.y)}
          </span>
        </div>
        <div
          className="experiment drag-experiment"
          ref={dragRef}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setDrag(position(e, e.currentTarget));
          }}
          onPointerMove={moveDrag}
          data-cursor="DRAG"
        >
          <div className="experiment-info">
            <span>02 / KINETIC FORM</span>
            <p>Drag the object across its field.</p>
          </div>
          <div className="drag-field">
            <span className="drag-orbit" />
            <span
              className="drag-object"
              style={{ left: `${drag.x}%`, top: `${drag.y}%` }}
            />
          </div>
          <span className="experiment-coordinate">DRAG / TOUCH</span>
        </div>
        <div
          className="experiment type-experiment"
          onPointerDown={(e) => setType(position(e, e.currentTarget).x)}
          onPointerMove={(e) => setType(position(e, e.currentTarget).x)}
          onPointerLeave={() => setType(0)}
        >
          <div className="experiment-info">
            <span>03 / VARIABLE TYPE</span>
            <p>Explore a typographic response.</p>
          </div>
          <strong
            style={{
              letterSpacing: `${(type / 100) * -0.12}em`,
              transform: `skewX(${(type / 100) * -9}deg) scaleX(${1 + type / 500})`,
            }}
          >
            SHIFT
          </strong>
          <span className="experiment-coordinate">MOVE / TOUCH</span>
        </div>
      </div>
    </section>
  );
}
