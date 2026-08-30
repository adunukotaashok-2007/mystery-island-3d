// ======================================
// MYSTERY ISLAND 3D
// ======================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


// ======================================
// CAMERA
// ======================================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);

camera.position.set(0, 18, 25);


// ======================================
// RENDERER
// ======================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

document.getElementById("game").appendChild(
    renderer.domElement
);


// ======================================
// LIGHTING
// ======================================

const sunlight = new THREE.DirectionalLight(
    0xffffff,
    2
);

sunlight.position.set(
    100,
    200,
    100
);

sunlight.castShadow = true;

scene.add(sunlight);


const ambientLight = new THREE.HemisphereLight(
    0x87ceeb,
    0x31572c,
    1.5
);

scene.add(ambientLight);


// ======================================
// OCEAN
// ======================================

const oceanGeometry =
    new THREE.PlaneGeometry(
        4000,
        4000
    );

const oceanMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x2196d3,
        roughness: 0.5,
        metalness: 0
    });

const ocean =
    new THREE.Mesh(
        oceanGeometry,
        oceanMaterial
    );

ocean.rotation.x = -Math.PI / 2;

ocean.position.y = -1;

scene.add(ocean);


// ======================================
// ISLAND
// ======================================

const islandGeometry =
    new THREE.CylinderGeometry(
        80,
        90,
        5,
        64
    );

const islandMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x63b75d,
        roughness: 0.9
    });

const island =
    new THREE.Mesh(
        islandGeometry,
        islandMaterial
    );

island.position.y = 1.5;

island.receiveShadow = true;

scene.add(island);


// ======================================
// SAND
// ======================================

const sandGeometry =
    new THREE.CylinderGeometry(
        84,
        94,
        1,
        64
    );

const sandMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xe7d28c
    });

const sand =
    new THREE.Mesh(
        sandGeometry,
        sandMaterial
    );

sand.position.y = 4;

scene.add(sand);


// ======================================
// PLAYER
// ======================================

const player = new THREE.Group();


// Body

const bodyGeometry =
    new THREE.SphereGeometry(
        1.5,
        24,
        24
    );

const bodyMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffcc66
    });

const body =
    new THREE.Mesh(
        bodyGeometry,
        bodyMaterial
    );

body.position.y = 2;

body.castShadow = true;

player.add(body);


// Head

const headGeometry =
    new THREE.SphereGeometry(
        1.2,
        24,
        24
    );

const headMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xffd28a
    });

const head =
    new THREE.Mesh(
        headGeometry,
        headMaterial
    );

head.position.y = 4;

head.castShadow = true;

player.add(head);


// Hat

const hatGeometry =
    new THREE.CylinderGeometry(
        1.4,
        1.6,
        0.8,
        24
    );

const hatMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x7b4f2c
    });

const hat =
    new THREE.Mesh(
        hatGeometry,
        hatMaterial
    );

hat.position.y = 5.2;

hat.castShadow = true;

player.add(hat);


player.position.set(
    0,
    0,
    0
);

scene.add(player);


// ======================================
// TREASURES
// ======================================

const treasures = [];

const treasurePositions = [
    [-35, 0, -25],
    [35, 0, -15],
    [-25, 0, 30],
    [30, 0, 35],
    [0, 0, 50]
];


function createTreasure(x, y, z) {

    const geometry =
        new THREE.OctahedronGeometry(
            1.2,
            0
        );

    const material =
        new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x004444
        });

    const treasure =
        new THREE.Mesh(
            geometry,
            material
        );

    treasure.position.set(
        x,
        y + 2,
        z
    );

    treasure.castShadow = true;

    treasure.userData.found = false;

    scene.add(treasure);

    treasures.push(treasure);
}


for (const position of treasurePositions) {

    createTreasure(
        position[0],
        position[1],
        position[2]
    );
}


// ======================================
// TREES
// ======================================

function createTree(x, z) {

    const tree = new THREE.Group();


    // Trunk

    const trunkGeometry =
        new THREE.CylinderGeometry(
            0.5,
            0.7,
            4,
            12
        );

    const trunkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x7b4f2c
        });

    const trunk =
        new THREE.Mesh(
            trunkGeometry,
            trunkMaterial
        );

    trunk.position.y = 5;

    trunk.castShadow = true;

    tree.add(trunk);


    // Leaves

    const leavesGeometry =
        new THREE.SphereGeometry(
            3,
            16,
            16
        );

    const leavesMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x2f8f46
        });

    const leaves =
        new THREE.Mesh(
            leavesGeometry,
            leavesMaterial
        );

    leaves.position.y = 8;

    leaves.castShadow = true;

    tree.add(leaves);


    tree.position.set(
        x,
        0,
        z
    );

    scene.add(tree);
}


const treePositions = [
    [-55, -45],
    [-25, -55],
    [20, -50],
    [50, -40],
    [-60, 0],
    [55, 5],
    [-50, 45],
    [-20, 55],
    [25, 50],
    [55, 45]
];


for (const position of treePositions) {

    createTree(
        position[0],
        position[1]
    );
}


// ======================================
// HOUSE
// ======================================

function createHouse() {

    const house = new THREE.Group();


    const wallGeometry =
        new THREE.BoxGeometry(
            12,
            7,
            10
        );

    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xf2d6a2
        });

    const walls =
        new THREE.Mesh(
            wallGeometry,
            wallMaterial
        );

    walls.position.y = 7;

    walls.castShadow = true;

    house.add(walls);


    const roofGeometry =
        new THREE.ConeGeometry(
            9,
            5,
            4
        );

    const roofMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xc95c54
        });

    const roof =
        new THREE.Mesh(
            roofGeometry,
            roofMaterial
        );

    roof.position.y = 13;

    roof.rotation.y =
        Math.PI / 4;

    roof.castShadow = true;

    house.add(roof);


    house.position.set(
        -20,
        0,
        -5
    );

    scene.add(house);
}

createHouse();


// ======================================
// MOVEMENT
// ======================================

const keys = {};

window.addEventListener(
    "keydown",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = true;
    }
);


window.addEventListener(
    "keyup",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = false;
    }
);


// ======================================
// TOUCH CONTROLS
// ======================================

function setupControl(id, key) {

    const button =
        document.getElementById(id);

    button.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            keys[key] = true;
        }
    );

    button.addEventListener(
        "pointerup",
        function(event) {

            event.preventDefault();

            keys[key] = false;
        }
    );

    button.addEventListener(
        "pointercancel",
        function() {

            keys[key] = false;
        }
    );

    button.addEventListener(
        "pointerleave",
        function() {

            keys[key] = false;
        }
    );
}


setupControl("joystickUp", "w");
setupControl("joystickDown", "s");
setupControl("joystickLeft", "a");
setupControl("joystickRight", "d");


// ======================================
// GAME VARIABLES
// ======================================

let treasureCount = 0;

const speed = 0.35;


// ======================================
// UPDATE
// ======================================

function update() {

    let dx = 0;
    let dz = 0;


    if (
        keys["w"] ||
        keys["arrowup"]
    ) {
        dz -= 1;
    }


    if (
        keys["s"] ||
        keys["arrowdown"]
    ) {
        dz += 1;
    }


    if (
        keys["a"] ||
        keys["arrowleft"]
    ) {
        dx -= 1;
    }


    if (
        keys["d"] ||
        keys["arrowright"]
    ) {
        dx += 1;
    }


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


    // Island boundary

    const distance =
        Math.sqrt(
            player.position.x *
            player.position.x +

            player.position.z *
            player.position.z
        );


    if (distance > 72) {

        const angle =
            Math.atan2(
                player.position.z,
                player.position.x
            );

        player.position.x =
            Math.cos(angle) * 72;

        player.position.z =
            Math.sin(angle) * 72;
    }


    // Treasure collection

    for (
        const treasure of treasures
    ) {

        if (treasure.userData.found) {
            continue;
        }


        const dx =
            player.position.x -
            treasure.position.x;

        const dz =
            player.position.z -
            treasure.position.z;


        const distance =
            Math.sqrt(
                dx * dx +
                dz * dz
            );


        if (distance < 4) {

            treasure.userData.found =
                true;

            treasure.visible =
                false;

            treasureCount++;


            document.getElementById(
                "treasure"
            ).textContent =
                "💎 Treasures: " +
                treasureCount;


            document.getElementById(
                "message"
            ).textContent =
                "🎉 Treasure discovered!";
        }
    }


    // Camera follow

    camera.position.x =
        player.position.x;

    camera.position.z =
        player.position.z + 25;

    camera.position.y = 18;


    camera.lookAt(
        player.position.x,
        2,
        player.position.z
    );


    // Rotate treasures

    for (
        const treasure of treasures
    ) {

        if (
            !treasure.userData.found
        ) {

            treasure.rotation.y +=
                0.03;

            treasure.rotation.x +=
                0.01;
        }
    }


    if (
        treasureCount ===
        treasures.length
    ) {

        document.getElementById(
            "message"
        ).textContent =
            "🏆 You found all the treasures!";
    }
}


// ======================================
// ANIMATION
// ======================================

function animate() {

    requestAnimationFrame(
        animate
    );

    update();

    renderer.render(
        scene,
        camera
    );
}


// ======================================
// RESIZE
// ======================================

window.addEventListener(
    "resize",
    function() {

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


// ======================================
// START
// ======================================

document.getElementById(
    "loading"
).style.display = "none";

animate();
