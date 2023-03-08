<div class="sections">
    <div class="journey">
        <p>🚀</p>
        <p>🌎</p>
    </div>
    <div class="content">
        <h2>Salve</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate eget urna id pellentesque. Quisque feugiat quam turpis, eu lacinia tellus rutrum id. Nulla dapibus dolor in lectus congue, id rhoncus ante fermentum. Morbi varius, ex at finibus interdum, est ligula dictum purus, commodo dictum ex tortor a elit. In tempus diam eu risus pulvinar tempor. Nam cursus sapien sapien, et aliquet turpis faucibus vitae. Curabitur suscipit sodales est, eu cursus sem condimentum at. Suspendisse sed euismod enim, rutrum efficitur lectus. Vivamus eget metus vel mi tincidunt pretium. Nunc quis rhoncus libero, id faucibus magna. Proin rutrum purus leo, sit amet laoreet enim fermentum eget. Donec velit justo, tristique id tempus quis, porttitor et mi. Maecenas eu consequat lorem.
            Curabitur eget semper sapien, sollicitudin lobortis turpis. Phasellus ultricies ullamcorper nibh, sit amet ullamcorper tellus hendrerit a. Aenean luctus, lorem eu maximus venenatis, leo tellus fermentum lacus, id euismod turpis tortor vitae magna. Integer nec metus ornare, bibendum sapien nec, egestas sem. Pellentesque posuere vel mauris ut feugiat. Maecenas et interdum sem, et pharetra justo. Cras pretium ac libero eget finibus. Nulla eget nisi in nunc faucibus hendrerit sit amet nec felis. Aliquam auctor, est eget tempor feugiat, sem dolor imperdiet lorem, at viverra erat urna ut leo. Cras cursus vitae mi nec dapibus. Etiam lorem quam, ornare dapibus est vitae, imperdiet molestie nunc. Aliquam faucibus mi vitae diam porttitor aliquet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed blandit metus tincidunt scelerisque placerat.
            Nam tortor metus, scelerisque vitae erat ut, consequat efficitur lorem. Morbi viverra velit ipsum, suscipit pharetra neque pellentesque in. Vivamus tempus, enim a maximus molestie, elit enim tempor leo, ac consequat massa dolor eget nisl. Donec facilisis convallis bibendum. Aenean aliquam, dolor ut ultricies sagittis, elit nibh malesuada nisl, quis placerat elit neque sed dolor. Donec euismod placerat aliquet. Sed facilisis sit amet tellus a auctor.
            Nunc vel nisl tristique, tempor leo id, egestas eros. Pellentesque ultrices blandit tellus, ac sollicitudin dui tincidunt in. Phasellus ut porttitor nibh. Suspendisse orci dolor, auctor ut sem nec, maximus imperdiet libero. Pellentesque varius, dolor in pulvinar suscipit, neque tellus lacinia libero, id aliquet felis neque nec ipsum. Nulla interdum ultricies dui, in malesuada lacus ullamcorper ut. Aliquam et est id risus lobortis elementum quis tristique neque. Vestibulum et mattis metus, quis hendrerit leo. Integer in tortor ac erat condimentum lacinia vitae et ligula. Curabitur elementum consequat lacus et efficitur. Cras id sem in orci lacinia eleifend quis ut ipsum. Donec tincidunt ligula imperdiet libero varius fermentum. Aliquam feugiat dolor sem, placerat tincidunt lectus cursus non. Maecenas consectetur mauris at aliquam fermentum.
            Nam eu magna vel sapien tempor pharetra vel vel magna. Donec maximus et ante a blandit. Pellentesque a tempus magna, et lacinia sem. Donec iaculis malesuada vehicula. Praesent ac fermentum sem, mattis placerat est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dapibus mi mi, nec bibendum mauris rhoncus ut. Aenean ultrices elit vitae nulla rutrum eleifend. Sed in dolor a metus laoreet blandit id sit amet elit. Duis tortor purus, pretium eu aliquam sed, semper sed urna.
        </p>
    </div>
    <div class="checkpoints">
        <p>🚀</p>
        <p>🌎</p>
    </div>
</div>

<style lang="scss">
    h2 {
        font-family: 'Work Sans';
    }

    .sections {
        display: flex;
        flex-direction: row;
        height: 100%;

        > div {
            overflow-x: hidden;
        }

        .journey {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            
            width: calc(40% - 64px);
        }

        .content {
            margin-top: calc(20vh - 128px);
            padding: 128px;

            width: 60%;

            text-align: justify;

            scrollbar-width: none;
            -ms-overflow-style: none;
            ::-webkit-scrollbar {
                width: 0;
            }
        }

        .checkpoints {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;

            width: 64px;
        }
    }
</style>