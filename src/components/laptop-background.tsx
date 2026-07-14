"use client"

export function LaptopBackground() {
  return (
    <div className="laptop-bg" aria-hidden="true">
      <div className="laptop-scene-zoom">
        <div className="laptop-scene">
          <div className="laptop-scene-rock">
            <div className="laptop-scene-spin">
              <div className="laptop-scene-shadow">
                <div className="laptop-scene-jump">
                  <div className="laptop-scene-flip">
                    <div className="laptop">
                      {/* Top shell (screen) */}
                      <div className="laptop-shell laptop-shell--top">
                        <div className="cuboid cuboid--screen">
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side">
                            <div className="laptop-screen-inner">
                              <span className="laptop-screen-text">PM</span>
                            </div>
                          </div>
                          <div className="cuboid__side" />
                        </div>
                      </div>
                      {/* Bottom shell (keyboard) */}
                      <div className="laptop-shell laptop-shell--bottom">
                        <div className="cuboid cuboid--keyboard">
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
