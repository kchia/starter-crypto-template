import styles from "./about.module.css";
export default function AboutPage() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>About</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus
        lobortis quam ac dapibus. Vivamus vel semper neque. Mauris mauris
        libero, porta ut dictum et, imperdiet posuere mi. Sed lacus odio,
        rhoncus eget fringilla at, placerat et tellus. Nullam posuere tortor nec
        vehicula commodo. Etiam gravida justo et purus fringilla, et rutrum quam
        aliquet. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Sed vulputate eros egestas ex viverra
        rutrum. In scelerisque varius justo a tincidunt. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Mauris non rhoncus elit. Mauris rhoncus faucibus nibh id ultrices.
      </p>
      <p>
        Aenean ac sodales libero. Nulla at hendrerit quam. Vivamus feugiat
        molestie dolor, vitae euismod nulla laoreet et. Vivamus risus ipsum,
        dignissim id bibendum at, rutrum id nisi. Etiam vitae neque erat. Proin
        rhoncus nisl ut diam ullamcorper, sit amet pharetra ex porttitor. Sed
        interdum volutpat nisl a fringilla. Morbi eget nibh est. Nunc ut odio
        sed libero placerat dignissim. Curabitur quis nunc a sem iaculis
        pellentesque vitae sed nisi.
      </p>
    </section>
  );
}
