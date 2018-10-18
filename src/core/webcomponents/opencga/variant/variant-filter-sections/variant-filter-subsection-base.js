class VariantFilterSubsectionBase extends Polymer.Element {

    static get properties() {
        return {
            query: {
                type: Object,
                notify: true,
            },
            tooltipId: {
                type: String,
                readOnly: true,
            },
            title: {
                type: String,
                value: "Generic subsection",
                readOnly: true,
            },
            tooltip: {
                type: String,
                value: "Generic subsection",
                readOnly: true,
            },
        }
    }

    static get observers() {
        return [
            'onQueryChanged(query.*)',
        ];
    }

    // _attachDom(dom) {
    //     this.appendChild(dom);
    // }

    constructor() {
        super();
        const prefix = `vfsubsec-${Utils.randomString(12)}`;
        this._setTooltipId(`${prefix}-tooltip-id`);
    }

    connectedCallback() {
        super.connectedCallback();

        const tooltipDesc = {
            content: { title: "", text: "" },
            position: { target: "mouse", adjust: { x: 2, y: 2, mouse: false } },
            style: { width: true, classes: "qtip-dark qtip-rounded qtip-shadow" },
            show: { delay: 200 },
            hide: { fixed: true, delay: 300 },
        };
        $(`#${this.tooltipId}`).qtip({
            ...tooltipDesc,
            content: {
                title: this.title,
                text: this.tooltip,
            },
        });
    }

    notifyQueryUpdate() {
        const params = {
            detail: {
                value: this.query,
            },
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent("query-changed", params));
    }
}