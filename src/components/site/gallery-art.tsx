import Image from "next/image";

export type GalleryId = "building" | "investing" | "side-projects" | "about" | "journey" | "certifications";

/** Small editorial scenes made from real portfolio assets and typesetting. */
export function GalleryArt({ id }: { id: GalleryId }) {
  return <div className={`gallery-art gallery-art--${id}`} aria-hidden="true">
    {id === "building" && <div className="gallery-products">
      <div className="gallery-product gallery-product--back"><Image src="/getaitrade-ss.png" alt="" fill sizes="300px" className="object-cover object-top" /></div>
      <div className="gallery-product gallery-product--phone"><Image src="/marketplay/decision.webp" alt="" fill sizes="180px" className="object-cover object-top" /></div>
      <div className="gallery-product-stamp">MarketPlay<br /><span>GetAITrade / 10x Founders</span></div>
    </div>}
    {id === "investing" && <div className="gallery-ledger"><span className="gallery-art-kicker">A NOTE TO MYSELF</span><p>Price is what<br />you pay.</p><span className="gallery-ledger-rule" /><p className="gallery-ledger-serif">Value is what<br />you study.</p><span className="gallery-art-foot">RESEARCH → CONVICTION → RISK</span></div>}
    {id === "side-projects" && <div className="gallery-notes"><div className="gallery-note gallery-note--back">01 / RESEARCH<br /><span>Collect.<br />Connect.<br />Remember.</span></div><div className="gallery-note gallery-note--front"><span className="gallery-art-kicker">THE PERSONAL TOOLKIT</span><p>Small tools.<br />Fewer steps.</p><div className="gallery-code-lines"><i /><i /><i /></div><span className="gallery-art-foot">NOTES · JOURNALS · EXPERIMENTS</span></div></div>}
    {id === "about" && <><Image src="/portrait.png" alt="" fill sizes="(max-width: 640px) 100vw, 440px" className="gallery-portrait object-cover" /><span className="gallery-portrait-note">Aarit, beyond<br />the projects.</span></>}
    {id === "journey" && <div className="gallery-journey"><span className="gallery-art-kicker">ALWAYS A WORK IN PROGRESS</span><div className="gallery-path"><span>2011</span><i /><span>2025</span><i /><span>Next</span></div><p>Still learning.<br /><em>Still going.</em></p><span className="gallery-art-foot">MUMBAI, AND WHAT COMES AFTER</span></div>}
    {id === "certifications" && <div className="gallery-papers"><div className="gallery-paper gallery-paper--back" /><div className="gallery-paper"><span className="gallery-art-kicker">THE LEARNING FILE</span><p>Proof of<br /><em>practice.</em></p><span className="gallery-paper-seal">AS</span><span className="gallery-art-foot">COURSES & JOB SIMULATIONS</span></div></div>}
  </div>;
}
