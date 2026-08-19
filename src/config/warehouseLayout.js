export const WAREHOUSE_LAYOUT = {
  oficina: {
    id: 'oficina',
    name: 'Oficina TI (Mueble Colgante)',
    topBoxes: [
      { id: 'OFI-TOP', name: 'Oficina > Techo > Único' }
    ],
    officeFurniture: {
      module1: {
        name: "Módulo 1",
        plasticContainers: [
          { id: "OFI-M1-N1-P1", name: "Oficina > Módulo 1 > Nivel 1 > Pos 1" },
          { id: "OFI-M1-N1-P2", name: "Oficina > Módulo 1 > Nivel 1 > Pos 2" },
          { id: "OFI-M1-N1-P3", name: "Oficina > Módulo 1 > Nivel 1 > Pos 3" },
          { id: "OFI-M1-N2-P1", name: "Oficina > Módulo 1 > Nivel 2 > Pos 1" },
          { id: "OFI-M1-N2-P2", name: "Oficina > Módulo 1 > Nivel 2 > Pos 2" },
          { id: "OFI-M1-N2-P3", name: "Oficina > Módulo 1 > Nivel 2 > Pos 3" },
          { id: "OFI-M1-N3-P1", name: "Oficina > Módulo 1 > Nivel 3 > Pos 1" },
          { id: "OFI-M1-N3-P2", name: "Oficina > Módulo 1 > Nivel 3 > Pos 2" },
          { id: "OFI-M1-N3-P3", name: "Oficina > Módulo 1 > Nivel 3 > Pos 3" }
        ],
        boxStock: { id: "OFI-M1-N4-P1", name: "Oficina > Módulo 1 > Nivel 4 > Pos 1" },
        extraOrganizer: { id: "OFI-M1-N4-P2", name: "Oficina > Módulo 1 > Nivel 4 > Pos 2" },
        drawerOrganizer: {
          idPrefix: "OFI-M1-N",
          startRow: 5,
          totalDrawers: 6
        }
      },
      module2: {
        name: "Módulo 2",
        plasticContainers: [
          { id: "OFI-M2-N1-P1", name: "Oficina > Módulo 2 > Nivel 1 > Pos 1" },
          { id: "OFI-M2-N1-P2", name: "Oficina > Módulo 2 > Nivel 1 > Pos 2" },
          { id: "OFI-M2-N2-P1", name: "Oficina > Módulo 2 > Nivel 2 > Pos 1" },
          { id: "OFI-M2-N2-P2", name: "Oficina > Módulo 2 > Nivel 2 > Pos 2" },
          { id: "OFI-M2-N3-P1", name: "Oficina > Módulo 2 > Nivel 3 > Pos 1" },
          { id: "OFI-M2-N3-P2", name: "Oficina > Módulo 2 > Nivel 3 > Pos 2" },
          { id: "OFI-M2-N4-P1", name: "Oficina > Módulo 2 > Nivel 4 > Pos 1" },
          { id: "OFI-M2-N5-P1", name: "Oficina > Módulo 2 > Nivel 5 > Pos 1" },
          { id: "OFI-M2-N6-P1", name: "Oficina > Módulo 2 > Nivel 6 > Pos 1" },
          { id: "OFI-M2-N7-P1", name: "Oficina > Módulo 2 > Nivel 7 > Pos 1" },
          { id: "OFI-M2-N8-P1", name: "Oficina > Módulo 2 > Nivel 8 > Pos 1" }
        ],
        bottomShelf: { id: "OFI-M2-N9-P1", name: "Oficina > Módulo 2 > Nivel 9 > Pos 1" }
      },
      module3: {
        name: "Módulo 3",
        shelves: [
          { id: "OFI-M3-N1-P1", name: "Oficina > Módulo 3 > Nivel 1 > Pos 1" },
          { id: "OFI-M3-N2-P1", name: "Oficina > Módulo 3 > Nivel 2 > Pos 1" },
          { id: "OFI-M3-N3-P1", name: "Oficina > Módulo 3 > Nivel 3 > Pos 1" }
        ]
      },
      module4: {
        name: "Módulo 4",
        shelves: [
          { id: "OFI-M4-N1-P1", name: "Oficina > Módulo 4 > Nivel 1 > Pos 1" },
          { id: "OFI-M4-N2-P1", name: "Oficina > Módulo 4 > Nivel 2 > Pos 1" },
          { id: "OFI-M4-N3-P1", name: "Oficina > Módulo 4 > Nivel 3 > Pos 1" }
        ]
      }
    }
  },
  bodega: {
    id: 'bodega',
    name: 'Bodega TI (Sala Angosta)',
    levels: [
      {
        id: 'BOD-TOP',
        name: 'Bodega > Techo',
        sections: [
          { id: 'BOD-TOP-01', name: 'Bodega > Techo > Pos 1' }
        ]
      },
      {
        id: 'BOD-E1',
        name: 'Estante 1',
        sections: [
          { id: 'BOD-E1-N1-P1', name: 'Bodega > Estante 1 > Nivel 1 > Pos 1' },
          { id: 'BOD-E1-N2-P1', name: 'Bodega > Estante 1 > Nivel 2 > Pos 1' },
          { id: 'BOD-E1-N3-P1', name: 'Bodega > Estante 1 > Nivel 3 > Pos 1' },
          { id: 'BOD-E1-N4-P1', name: 'Bodega > Estante 1 > Nivel 4 > Pos 1' }
        ]
      },
      {
        id: 'BOD-E2',
        name: 'Estante 2',
        sections: [
          { id: 'BOD-E2-N1-P1', name: 'Bodega > Estante 2 > Nivel 1 > Pos 1' },
          { id: 'BOD-E2-N2-P1', name: 'Bodega > Estante 2 > Nivel 2 > Pos 1' },
          { id: 'BOD-E2-N3-P1', name: 'Bodega > Estante 2 > Nivel 3 > Pos 1' },
          { id: 'BOD-E2-N4-P1', name: 'Bodega > Estante 2 > Nivel 4 > Pos 1' }
        ]
      },
      {
        id: 'BOD-E3',
        name: 'Estante 3',
        sections: [
          { id: 'BOD-E3-N1-P1', name: 'Bodega > Estante 3 > Nivel 1 > Pos 1' },
          { id: 'BOD-E3-N2-P1', name: 'Bodega > Estante 3 > Nivel 2 > Pos 1' },
          { id: 'BOD-E3-N3-P1', name: 'Bodega > Estante 3 > Nivel 3 > Pos 1' },
          { id: 'BOD-E3-N4-P1', name: 'Bodega > Estante 3 > Nivel 4 > Pos 1' }
        ]
      },
      {
        id: 'BOD-E4',
        name: 'Estante 4',
        sections: [
          { id: 'BOD-E4-N1-P1', name: 'Bodega > Estante 4 > Nivel 1 > Pos 1' },
          { id: 'BOD-E4-N2-P1', name: 'Bodega > Estante 4 > Nivel 2 > Pos 1' },
          { id: 'BOD-E4-N3-P1', name: 'Bodega > Estante 4 > Nivel 3 > Pos 1' },
          { id: 'BOD-E4-N4-P1', name: 'Bodega > Estante 4 > Nivel 4 > Pos 1' }
        ]
      }
    ]
  }
};

// Generar opciones planas para selects
export const LOCATION_OPTIONS = [];

// Parse Oficina
WAREHOUSE_LAYOUT.oficina.topBoxes.forEach(b => LOCATION_OPTIONS.push({ value: b.id, label: b.name }));

const mods = WAREHOUSE_LAYOUT.oficina.officeFurniture;
Object.keys(mods).forEach(modKey => {
  const mod = mods[modKey];
  if (mod.plasticContainers) {
    mod.plasticContainers.forEach(c => LOCATION_OPTIONS.push({ value: c.id, label: c.name }));
  }
  if (mod.drawerOrganizer) {
    for (let i = 1; i <= mod.drawerOrganizer.totalDrawers; i++) {
      const numLevel = mod.drawerOrganizer.startRow + (i - 1);
      const code = `${mod.drawerOrganizer.idPrefix}${numLevel}-P1`;
      LOCATION_OPTIONS.push({ value: code, label: `Oficina > ${mod.name} > Nivel ${numLevel} > Pos 1` });
    }
  }
  if (mod.boxStock) {
    LOCATION_OPTIONS.push({ value: mod.boxStock.id, label: mod.boxStock.name });
  }
  if (mod.extraOrganizer) {
    LOCATION_OPTIONS.push({ value: mod.extraOrganizer.id, label: mod.extraOrganizer.name });
  }
  if (mod.bottomShelf) {
    LOCATION_OPTIONS.push({ value: mod.bottomShelf.id, label: mod.bottomShelf.name });
  }
  if (mod.shelves) {
    mod.shelves.forEach(s => LOCATION_OPTIONS.push({ value: s.id, label: s.name }));
  }
});

// Parse Bodega
WAREHOUSE_LAYOUT.bodega.levels.forEach(level => {
  level.sections.forEach(section => {
    LOCATION_OPTIONS.push({ value: section.id, label: section.name });
  });
});
