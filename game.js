// ==========================================
// MYSTERY ISLAND 3D - ENVIRONMENT UPGRADE
// ==========================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x8fd3ff);

scene.fog = new THREE.FogExp2(
    0x8fd3ff,
    0.006
);


// ==========================================
// CAMERA
// ==========================================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.set(0, 12, 22);


// ==========================================
// RENDERER
// ==========================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 1.5)
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

document
    .getElementById("game")
    .appendChild(renderer.domElement);


// ==========================================
// LIGHT
// ==========================================

const sun =
    new THREE.DirectionalLight(
        0xffffff,
        3
    );

sun.position.set(
    -100,
    180,
    80
);

sun.castShadow = true;

sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;

sun.shadow.camera.left = -150;
sun.shadow.camera.right = 150;
sun.shadow.camera.top = 150;
sun.shadow.camera.bottom = -150;

scene.add(sun);


const skyLight =
    new THREE.HemisphereLight(
        0x9bdcff,
        0x345b35,
        2
    );

scene.add(skyLight);


// ==========================================
// OCEAN
// ==========================================

const oceanGeometry =
    new THREE.PlaneGeometry(
        2000,
        2000,
        100,
        100
    );

const oceanMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x167fc1,
        roughness: 0.15,
        metalness: 0.05,
        transparent: true,
        opacity: 0.92
    });

const ocean =
    new THREE.Mesh(
        oceanGeometry,
        oceanMaterial
    );

ocean.rotation.x =
    -Math.PI / 2;

ocean.position.y = -2;

scene.add(ocean);


// ==========================================
// ISLAND TERRAIN
// ==========================================

const terrainSize = 150;

const terrainGeometry =
    new THREE.PlaneGeometry(
        terrainSize,
        terrainSize,
        100,
        100
    );

const terrainMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x5e9f4c,
        roughness: 0.95
    });

const terrain =
    new THREE.Mesh(
        terrainGeometry,
        terrainMaterial
    );

terrain.rotation.x =
    -Math.PI / 2;

terrain.receiveShadow = true;

scene.add(terrain);


// ==========================================
// TERRAIN HEIGHTS
// ==========================================

const vertices =
    terrainGeometry.attributes.position;

for (
    let i = 0;
    i < vertices.count;
    i++
) {

    const x =
        vertices.getX(i);

    const z =
        vertices.getY(i);

    const distance =
        Math.sqrt(
            x * x +
            z * z
        );

    let height = 0;

    if (distance < 55) {

        height =
            Math.sin(x * 0.08) *
            1.2 +

            Math.cos(z * 0.09) *
            1.1;

        height +=
            Math.sin(
                (x + z) * 0.04
            ) * 2;
    }

    if (distance < 35) {

        height +=
            2.5 *
            Math.exp(
                -(distance * distance) /
                1200
            );
    }

    vertices.setZ(
        i,
        Math.max(
            height,
            -0.5
        )
    );
}

vertices.needsUpdate = true;

terrainGeometry.computeVertexNormals();


// ==========================================
// BEACH
// ==========================================

const beachGeometry =
    new THREE.RingGeometry(
        55,
        75,
        96
    );

const beachMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xe6d19a,
        roughness: 1
    });

const beach =
    new THREE.Mesh(
        beachGeometry,
        beachMaterial
    );

beach.rotation.x =
    -Math.PI / 2;

beach.position.y =
    -0.25;

scene.add(beach);


// ==========================================
// ROCK CREATOR
// ==========================================

function createRock(
    x,
    y,
    z,
    scale
) {

    const geometry =
        new THREE.DodecahedronGeometry(
            1,
            1
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x5d625e,
            roughness: 1
        });

    const rock =
        new THREE.Mesh(
            geometry,
            material
        );

    rock.position.set(
        x,
        y,
        z
    );

    rock.scale.set(
        scale * 1.4,
        scale,
        scale * 0.9
    );

    rock.rotation.y =
        Math.random() * Math.PI;

    rock.castShadow = true;

    rock.receiveShadow = true;

    scene.add(rock);
}


// ==========================================
// ROCKS
// ==========================================

for (
    let i = 0;
    i < 35;
    i++
) {

    const angle =
        Math.random() *
        Math.PI * 2;

    const radius =
        35 +
        Math.random() * 38;

    createRock(
        Math.cos(angle) * radius,
        0.8,
        Math.sin(angle) * radius,
        0.5 +
        Math.random() * 1.5
    );
}


// ==========================================
// PALM TREE
// ==========================================

function createPalm(
    x,
    z,
    scale = 1
) {

    const tree =
        new THREE.Group();


    // trunk

    const trunkGeometry =
        new THREE.CylinderGeometry(
            0.35,
            0.65,
            8,
            12
        );

    const trunkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x76502d,
            roughness: 1
        });

    const trunk =
        new THREE.Mesh(
            trunkGeometry,
            trunkMaterial
        );

    trunk.position.y = 4;

    trunk.castShadow = true;

    tree.add(trunk);


    // leaves

    const leafMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x247a3a,
            roughness: 0.8,
            side: THREE.DoubleSide
        });


    for (
        let i = 0;
        i < 9;
        i++
    ) {

        const leaf =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.35,
                    5.5,
                    6
                ),
                leafMaterial
            );

        leaf.position.y = 8;

        leaf.rotation.z =
            Math.PI / 2.7;

        leaf.rotation.y =
            (Math.PI * 2 / 9) * i;

        leaf.translateZ(2);

        leaf.castShadow = true;

        tree.add(leaf);
    }


    tree.position.set(
        x,
        0,
        z
    );

    tree.scale.setScalar(scale);

    scene.add(tree);
}


// ==========================================
// PALMS
// ==========================================

const palmLocations = [
    [-48, -35],
    [-35, -48],
    [-15, -58],
    [15, -58],
    [40, -48],
    [55, -20],
    [58, 20],
    [48, 40],
    [-48, 38],
    [-58, 10],
    [-42, 10],
    [35, 15]
];

for (
    const location of palmLocations
) {

    createPalm(
        location[0],
        location[1],
        0.8 +
        Math.random() * 0.5
    );
}


// ==========================================
// HOUSE
// ==========================================

function createHouse(
    x,
    z
) {

    const house =
        new THREE.Group();


    const wall =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                12,
                6,
                10
            ),
            new THREE.MeshStandardMaterial({
                color: 0xc89b68,
                roughness: 0.9
            })
        );

    wall.position.y = 4;

    wall.castShadow = true;

    wall.receiveShadow = true;

    house.add(wall);


    const roof =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                9,
                5,
                4
            ),
            new THREE.MeshStandardMaterial({
                color: 0x6d3828,
                roughness: 1
            })
        );

    roof.position.y = 9.5;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    house.add(roof);


    // door

    const door =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.2,
                3.5,
                0.25
            ),
            new THREE.MeshStandardMaterial({
                color: 0x3d2416
            })
        );

    door.position.set(
        0,
        2,
        5.1
    );

    house.add(door);


    house.position.set(
        x,
        0,
        z
    );

    scene.add(house);
}

createHouse(
    -18,
    -10
);


// ==========================================
// TREASURE CHEST
// ==========================================

function createChest(
    x,
    z
) {

    const chest =
        new THREE.Group();


    const box =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.8,
                1.7,
                2
            ),
            new THREE.MeshStandardMaterial({
                color: 0x6b3d1f,
                roughness: 0.75
            })
        );

    box.position.y = 1.2;

    box.castShadow = true;

    chest.add(box);


    const lid =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                1.0,
                1.0,
                2.8,
                16,
                false,
                0,
                Math.PI
            ),
            new THREE.MeshStandardMaterial({
                color: 0x7d4a23
            })
        );

    lid.rotation.z =
        Math.PI / 2;

    lid.position.y = 2.05;

    lid.castShadow = true;

    chest.add(lid);


    // gold lock

    const lock =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.45,
                0.55,
                0.15
            ),
            new THREE.MeshStandardMaterial({
                color: 0xffd84d,
                metalness: 0.8,
                roughness: 0.25
            })
        );

    lock.position.set(
        0,
        1.5,
        1.05
    );

    chest.add(lock);


    chest.position.set(
        x,
        0,
        z
    );

    scene.add(chest);

    return chest;
}


// ==========================================
// TREASURES
// ==========================================

const treasureLocations = [
    [-32, -20],
    [30, -28],
    [-25, 28],
    [32, 30],
    [5, 42]
];

const chests = [];

for (
    const location of treasureLocations
) {

    chests.push(
        createChest(
            location[0],
            location[1]
        )
    );
}


// ==========================================
// PLAYER
// ==========================================

const player =
    new THREE.Group();


const body =
    new THREE.Mesh(
        new THREE.CapsuleGeometry(
            0.75,
            1.7,
            8,
            16
        ),
        new THREE.MeshStandardMaterial({
            color: 0x285b8f,
            roughness: 0.8
        })
    );

body.position.y = 2;

body.castShadow = true;

player.add(body);


const head =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.75,
            24,
            24
        ),
        new THREE.MeshStandardMaterial({
            color: 0xc98963,
            roughness: 0.8
        })
    );

head.position.y = 3.65;

head.castShadow = true;

player.add(head);


// backpack

const backpack =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            1.15,
            1.5,
            0.55
        ),
        new THREE.MeshStandardMaterial({
            color: 0x4b2f1f
        })
    );

backpack.position.set(
    0,
    2.2,
    0.8
);

backpack.castShadow = true;

player.add(backpack);


player.position.set(
    0,
    0,
    10
);

scene.add(player);


// ==========================================
// CONTROLS
// ==========================================

const keys = {};

window.addEventListener(
    "keydown",
    event => {

        keys[
            event.key.toLowerCase()
        ] = true;
    }
);

window.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;
    }
);


// ==========================================
// TOUCH CONTROLS
// ==========================================

function setupButton(
    id,
    key
) {

    const button =
        document.getElementById(id);

    if (!button) return;


    button.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();

            keys[key] = true;
        }
    );


    button.addEventListener(
        "pointerup",
        event => {

            event.preventDefault();

            keys[key] = false;
        }
    );


    button.addEventListener(
        "pointercancel",
        () => {

            keys[key] = false;
        }
    );
}


setupButton(
    "joystickUp",
    "w"
);

setupButton(
    "joystickDown",
    "s"
);

setupButton(
    "joystickLeft",
    "a"
);

setupButton(
    "joystickRight",
    "d"
);


// ==========================================
// GAME
// ==========================================

let treasureCount = 0;

const speed = 0.28;


function update() {

    let dx = 0;
    let dz = 0;


    if (
        keys["w"] ||
        keys["arrowup"]
    ) dz -= 1;


    if (
        keys["s"] ||
        keys["arrowdown"]
    ) dz += 1;


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) dx -= 1;


    if (
        keys["d"] ||
        keys["arrowright"]
    ) dx += 1;


    if (
        dx !== 0 ||
        dz !== 0
    ) {

        const length =
            Math.sqrt(
                dx * dx +
                dz * dz
            );

        dx /= length;
        dz /= length;


        player.position.x +=
            dx * speed;

        player.position.z +=
            dz * speed;


        player.rotation.y =
            Math.atan2(
                dx,
                dz
            );
    }


    // island boundary

    const distance =
        Math.sqrt(
            player.position.x ** 2 +
            player.position.z ** 2
        );

    if (distance > 63) {

        const angle =
            Math.atan2(
                player.position.z,
                player.position.x
            );

        player.position.x =
            Math.cos(angle) * 63;

        player.position.z =
            Math.sin(angle) * 63;
    }


    // treasure collection

    for (
        let i = 0;
        i < chests.length;
        i++
    ) {

        const chest =
            chests[i];

        if (!chest.visible)
            continue;


        const dx =
            player.position.x -
            chest.position.x;

        const dz =
            player.position.z -
            chest.position.z;


        const distance =
            Math.sqrt(
                dx * dx +
                dz * dz
            );


        if (distance < 3.5) {

            chest.visible = false;

            treasureCount++;


            document.getElementById(
                "treasure"
            ).textContent =
                "💎 Treasures: " +
                treasureCount +
                " / 5";


            document.getElementById(
                "message"
            ).textContent =
                "💎 Treasure discovered!";
        }
    }


    if (
        treasureCount === 5
    ) {

        document.getElementById(
            "message"
        ).textContent =
            "🏆 Amazing! You found all 5 treasures!";
    }


    // camera

    const desiredX =
        player.position.x;

    const desiredZ =
        player.position.z + 18;


    camera.position.x +=
        (
            desiredX -
            camera.position.x
        ) * 0.08;


    camera.position.z +=
        (
            desiredZ -
            camera.position.z
        ) * 0.08;


    camera.position.y +=
        (
            13 -
            camera.position.y
        ) * 0.08;


    camera.lookAt(
        player.position.x,
        2.5,
        player.position.z
    );
}


// ==========================================
// ANIMATION
// ==========================================

function animate() {

    requestAnimationFrame(
        animate
    );


    // subtle ocean movement

    const time =
        performance.now() * 0.001;


    ocean.position.y =
        -2 +
        Math.sin(time) * 0.08;


    // chest glow-like movement

    for (
        const chest of chests
    ) {

        if (chest.visible) {

            chest.rotation.y =
                Math.sin(time * 0.5) *
                0.015;
        }
    }


    update();


    renderer.render(
        scene,
        camera
    );
}


// ==========================================
// RESIZE
// ==========================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);


// ==========================================
// START
// ==========================================

const loading =
    document.getElementById(
        "loading"
    );

if (loading) {

    loading.style.display =
        "none";
}


animate();
