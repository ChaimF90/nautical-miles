import { AirportWithId } from '../../types';
type KeyPress = "ArrowDown" | "ArrowUp";
interface Action<T> {
    type: string;
    payload?: Array<T> | T;
};

interface MainContainerState {
    fromQuery: string;
    toQuery: string;
    fromAirport: AirportWithId;
    toAirport: AirportWithId;
    distance: number;
    buttonClicked: boolean;
    fromIndex: number;
    toIndex: number;
}

interface SearchInputProps {
    value: string;
    changeHandler: (event: any) => void;
    airports: Array<AirportWithId>;
    selectAirport: (airport: AirportWithId) => void;
    currentIndex: number;
    keyPressScroll: (eventType: KeyPress) => void
}

interface AppState {
    fromAirports: Array<AirportWithId>;
    toAirports: Array<AirportWithId>;
}

interface ContainerActions {
    getFromAirports: (query: string) => void;
    getToAirports: (query: string) => void;
    clearFromAirports: () => void;
    clearToAirports: () => void;
}

interface MapProps {
    toAirport: AirportWithId;
    fromAirport: AirportWithId;
    buttonClicked: boolean;
}

export {
    Action,
    MainContainerState,
    SearchInputProps,
    AppState,
    ContainerActions,
    MapProps,
    KeyPress
}