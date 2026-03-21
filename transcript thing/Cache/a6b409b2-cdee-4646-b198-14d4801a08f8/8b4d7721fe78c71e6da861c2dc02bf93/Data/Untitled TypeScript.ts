@component
export class TranscriptionComponent extends BaseScriptComponent {

    @input('Component.VoiceMLModule') vmlModule: any;
    @input transcriptText: Text;

    onAwake() {
        print("Script started on Spectacles!");

        this.vmlModule.onListeningUpdate.add((eventArgs) => {
            const transcript = eventArgs.transcription;
            if (transcript && transcript.length > 0) {
                this.transcriptText.text = transcript;
            }
        });

        this.vmlModule.onListeningError.add((eventErrorArgs) => {
            print('Error: ' + eventErrorArgs.error + ' desc: ' + eventErrorArgs.description);
        });

        // Delay startListening to let Spectacles fully initialize
        const delayEvent = this.createEvent("DelayedCallbackEvent");
        delayEvent.bind(() => {
            print("Starting listening...");
            const options = VoiceML.ListeningOptions.create();
            this.vmlModule.startListening(options);
        });
        delayEvent.reset(1.0); // 1 second delay
    }
}