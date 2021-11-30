export class AppSettings{
  public static API_BASE_URL:string = 'http://127.0.0.1:8080/api/';

  public static IMAGE_TYPE = {
    big:"web-image-card-big-1",
    middle:"web-image-card-middle-3",
    small:"web-image-card-small-2"
  }

  public static IMG_URL:string = 'http://127.0.0.1:8080/img/';

  public static LABLES:string[] = [
    "person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch", "potted plant", "bed", "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"
  ];

  public static CARD_LOOP_STYLES:string[] = [
    "web-image-card-big-1",
    "web-image-card-small-2","web-image-card-small-2","web-image-card-small-2",
    "web-image-card-middle-3","web-image-card-middle-3"
  ]

  public static styleGenerate(index:number):string{
    let classes:string = AppSettings.CARD_LOOP_STYLES[index%6];
    if(index%6 == 2){
      classes += " web-image-card-small-gap";
    }
    else if(index%6 == 4){
      classes += " web-image-card-middle-gap";
    }
    return classes;
  }


}
