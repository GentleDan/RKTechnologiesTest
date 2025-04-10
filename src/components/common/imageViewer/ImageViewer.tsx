import styles from "./ImageViewer.module.css";

type ImageViewerProps = {
  source: string | null;
};

function ImageViewer(props: ImageViewerProps) {
  return (
    <div className={styles.imageContainer}>
      {props.source ? <img src={props.source} alt={"Cat image"} /> : <span> There's nothing to show right now</span>}
    </div>
  );
}

export default ImageViewer;
