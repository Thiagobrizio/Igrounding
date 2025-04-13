import NiceModal from "@ebay/nice-modal-react";

import SettingsModal from "~/components/NavBar/SettingsModal";
import CreateConductorLocationModal from "~/features/conductorLocations/components/CreateConductorLocationModal";
import DeleteConductorLocationModal from "~/features/conductorLocations/components/DeleteConductorLocationModal";
import UpdateConductorLocationModal from "~/features/conductorLocations/components/UpdateConductorLocationModal";
import CreateConductorModal from "~/features/conductors/components/CreateConductorModal";
import DeleteConductorModal from "~/features/conductors/components/DeleteConductorModal";
import GenerateConductorsModal from "~/features/conductors/components/GenerateConductorsModal";
import UpdateConductorModal from "~/features/conductors/components/UpdateConductorModal";
import DeleteConductorTypeModal from "~/features/conductorTypes/components/DeleteConductorTypeModal";
import DeleteSourceModal from "~/features/sources/components/DeleteSourceModal";
import DeleteTowerGeometryModal from "~/features/towerGeometries/components/DeleteTowerGeometryModal";
import CreateTowerModal from "~/features/towers/components/CreateTowerModal";
import DeleteTowerModal from "~/features/towers/components/DeleteTowerModal";
import GenerateTowersModal from "~/features/towers/components/GenerateTowersModal";
import UpdateTowerModal from "~/features/towers/components/UpdateTowerModal";
import DeleteTransmissionLineModal from "~/features/transmissionLines/components/DeleteTransmissionLineModal";

NiceModal.register("create-conductor-location", CreateConductorLocationModal);
NiceModal.register("update-conductor-location", UpdateConductorLocationModal);
NiceModal.register("delete-conductor-location", DeleteConductorLocationModal);

NiceModal.register("create-conductor", CreateConductorModal);
NiceModal.register("update-conductor", UpdateConductorModal);
NiceModal.register("delete-conductor", DeleteConductorModal);

NiceModal.register("delete-source", DeleteSourceModal);

NiceModal.register("delete-transmission-line", DeleteTransmissionLineModal);

NiceModal.register("delete-tower-geometry", DeleteTowerGeometryModal);
NiceModal.register("delete-conductor-type", DeleteConductorTypeModal);

NiceModal.register("update-tower", UpdateTowerModal);
NiceModal.register("delete-tower", DeleteTowerModal);

NiceModal.register("create-conductor", CreateConductorModal);
NiceModal.register("generate-conductors", GenerateConductorsModal);

NiceModal.register("create-tower", CreateTowerModal);
NiceModal.register("generate-towers", GenerateTowersModal);
NiceModal.register("settings", SettingsModal);
