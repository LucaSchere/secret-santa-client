export type Strings = {
    short_form: string;
    connected: string;
    not_connected: string;
    entrance: {
        nick_name: {
            placeholder: string;
            label: string;
            validation: string
        };
        room_name: {
            placeholder: string;
            label: string;
            validation: string
        };
        room_id: {
            placeholder: string;
            label: string;
            validation: string
        };
        room_create_short: string;
        room_create: string;
        room_join_short: string;
        room_join: string;
    }
    room: {
        room_locked: string;
        draw: string,
        leave: string,
        leave_confirm: string,
        room_open: string,
    },
    errors: {
        [key: string]: string;
    }
    languages: {
        [key: string]: string;
    }
}

export const de: Strings = {
    'short_form': 'de',
    'connected': 'verbunden',
    'not_connected': 'nicht verbunden',
    entrance: {
        nick_name: {
            'placeholder': 'Dein Nickname',
            'label': 'Nickname',
            'validation': 'Dein Nickname wird benötigt'
        },
        room_name: {
            'placeholder': 'Name deines Raums',
            'label': 'Raumname',
            'validation': 'Der Name des Raums muss mindestens 3 Zeichen lang sein'
        },
        room_id: {
            'placeholder': 'ID eines bestehenden Raums',
            'label': 'Raum ID',
            'validation': 'Die Raum ID muss eine 6 stellige Zahlen-Buchstaben-Kombination sein'
        },
        'room_create_short': 'Erstellen',
        'room_create': 'Erstelle einen Raum',
        'room_join_short': 'Betreten',
        'room_join': 'Betrete einen bestehnden Raum',
    },
    room: {
        draw: 'Auslosen',
        leave: 'Verlassen',
        leave_confirm: 'Willst du den Raum wirklich verlassen?',
        room_open: 'Freunde können der Auslosung noch beitreten',
        room_locked: 'Die Auslosung hat begonnen'
    },
    errors: {
        'no_room_found': 'Kein Raum gefunden',
        'to_less_members': 'Für die Auslosung müssen mindestens 3 Personen im Raum sein',
        'room_already_started': 'Die Auslosung hat bereits begonnen',
    },
    languages: {
        'de': 'Deutsch',
        'en': 'Englisch',
        'ch': 'Schweizerdeutsch'
    }
}

export const ch: Strings = {
    'short_form': 'ch',
    'connected': 'vrbunge',
    'not_connected': 'nid vrbunge',
    entrance: {
        nick_name: {
            'placeholder': 'Di Nickname',
            'label': 'Nickname',
            'validation': 'Di Nickname wird benötigt'
        },
        room_name: {
            'placeholder': 'Name vo dim Ruum',
            'label': 'Ruumname',
            'validation': 'Dr Name vo dim Ruum muess mindestens 3 Zeiche lang sy'
        },
        room_id: {
            'placeholder': 'ID vom ne Ruum',
            'label': 'Ruum ID',
            'validation': 'D Ruum ID muess ä 6 stelligy Zahle-Buechstabe-Kombination sy'
        },
        'room_create_short': 'Ersteue',
        'room_create': 'Ersteu ä Ruum',
        'room_join_short': 'Beträte',
        'room_join': 'Betritt e bestehnde Ruum',
    },
    room: {
        draw: 'Uslose',
        leave: 'Vrlah',
        leave_confirm: 'Wetsch dr Ruum würk vrlah?',
        room_open: 'Dini Kollege chöi no biträte',
        room_locked: 'D Uslosig het ahgfange'
    },
    errors: {
        'no_room_found': 'Ke Ruum gfunge',
        'to_less_members': 'Fürd d Uslosig müesse mindestens 3 Lüt im Ruum sy',
        'room_already_started': 'D Uslosig het scho ahgfange',
    },
    languages: {
        'de': 'Dütsch',
        'en': 'Änglisch',
        'ch': 'Schwizerdütsch',
    }
}

export const en: Strings = {
    'short_form': 'en',
    'connected': 'connected',
    'not_connected': 'not connected',
    entrance: {
        nick_name: {
            'placeholder': 'Your nickname',
            'label': 'Nickname',
            'validation': 'Your nickname is required'
        },
        room_name: {
            'placeholder': 'Your rooms name',
            'label': 'Room name',
            'validation': 'The room name must be at least 3 characters'
        },
        room_id: {
            'placeholder': 'ID of an existing room',
            'label': 'Room ID',
            'validation': 'The room ID must be a 6-digit number/letter combination.'
        },
        'room_create_short': 'Create',
        'room_create': 'Create a new Room',
        'room_join_short': 'Join',
        'room_join': 'Join an existing room',
    },
    room: {
        draw: 'Draw',
        leave: 'Leave',
        leave_confirm: 'Are you sure you want to leave the room?',
        room_open: 'Friends can still join the draw',
        room_locked: 'The draw has started'
    },
    errors: {
        'no_room_found': 'No room found',
        'to_less_members': 'At least 3 people are required to draw',
        'room_already_started': 'The draw has already started',
    },
    languages: {
        'de': 'German',
        'en': 'English',
        'ch': 'Swiss-German'
    }
}

export const languages: { [key: string]: Strings } = {
    'en': en,
    'de': de,
    'ch': ch
}
